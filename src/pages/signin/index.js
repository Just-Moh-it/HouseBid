import React from "react";
import { getProviders, signIn } from "next-auth/react";

export default function SignIn({ providers }) {
  const handleSignInProvider = React.useCallback((providerId, event) => {
    signIn(providerId, {
      callbackUrl: `${window.location.origin}/protected`,
    });
  }, []);

  return (
    <>
      {Object.values(providers).map((provider) => (
        <div key={provider.name}>
          <button onClick={(e) => handleSignInProvider(provider.id, e)}>
            Sign in with {provider.name}
          </button>
        </div>
      ))}
    </>
  );
}

// This is the recommended way for Next.js 9.3 or newer
export async function getServerSideProps(context) {
  const providers = await getProviders();
  return {
    props: { providers },
  };
}
