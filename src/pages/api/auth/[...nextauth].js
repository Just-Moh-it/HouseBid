import NextAuth from "next-auth/next";
import GithubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import jwt from "jsonwebtoken";

const Providers = { Github: GithubProvider, Google: GoogleProvider };

export default NextAuth({
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  secret: process.env.NEXT_AUTH_SECRET,

  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60,
  },

  jwt: {
    secret: process.env.NEXT_AUTH_SECRET,
    encode: async ({ secret, token, maxAge }) => {
      if (!token.id) return jwt.sign(token, secret, { algorithm: "HS256" });
      return encoded({ token, secret });
    },
    decode: async ({ secret, token }) => {
      const decodedToken = jwt.verify(token, secret, { algorithms: ["HS256"] });
      return decodedToken;
    },
  },

  pages: {},

  callbacks: {
    async session({ session, token, user }) {
      const encodedToken = encoded({
        token,
        secret: process.env.NEXT_AUTH_SECRET,
      });

      session.user.image = token.image;
      session.user.id = token.sub;
      session.token = encodedToken;

      return Promise.resolve(session);
    },
    async jwt({ token, user, account, profile, isNewUser }) {
      const isUserSignedIn = user ? true : false;

      // Create user on api
      await fetch("https://house-bid.hasura.app/v1/graphql", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-hasura-admin-secret": process.env.HASURA_ADMIN_SECRET,
        },
        body: JSON.stringify({
          query: `
          mutation Insert_users_one($object: users_insert_input!) {
            insert_users_one(object: $object) {
              created_at
              name
              id
            }
          } 
      `,
          variables: {
            object: {
              id: token.sub,
              name: token.name,
              image_uri: token?.image,
            },
          },
        }),
      });

      if (isUserSignedIn) {
        token.id = user.id.toString();
        token.image = user.image;
        if (user.picture) user.image = user.picture && user.picture;
      }
      return token;
    },
  },

  events: {},

  debug: true,
});

const encoded = ({ token, secret }) => {
  const jwtClaims = {
    sub: token.sub.toString(),
    name: token.name,
    image: token.picture,
    email: token.email,
    iat: Date.now() / 1000,
    exp: Math.floor(Date.now() / 1000) + 24 * 60 * 60,
    "https://hasura.io/jwt/claims": {
      "x-hasura-allowed-roles": ["user"],
      "x-hasura-default-role": "user",
      "x-hasura-role": "user",
      "x-hasura-user-id": token.sub.toString(),
    },
  };
  const encodedToken = jwt.sign(jwtClaims, secret, { algorithm: "HS256" });

  return encodedToken;
};
