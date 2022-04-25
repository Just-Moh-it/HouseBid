import "../styles/globals.scss";
import { ToastContainer, toast } from "react-toastify";
import { SessionProvider } from "next-auth/react";
import "react-toastify/dist/ReactToastify.css";
import { ApolloProvider } from "@apollo/client";
import { useApollo } from "../lib/apolloClient";
import { SkeletonTheme } from "react-loading-skeleton";

function MyApp({ Component, pageProps }) {
  const { session } = pageProps;
  const apolloClient = useApollo(pageProps.initialApolloState, session?.token);

  return (
    <SessionProvider session={pageProps.session}>
      <ApolloProvider client={apolloClient}>
        <SkeletonTheme baseColor="#000000" highlightColor="#000000">
          <Component {...pageProps} />
          <ToastContainer />
        </SkeletonTheme>
      </ApolloProvider>
    </SessionProvider>
  );
}

export default MyApp;
