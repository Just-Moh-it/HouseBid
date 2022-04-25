import Header from "./Header";
import Footer from "./Footer";
import Navbar from "./Navbar";
import styles from "./index.module.scss";
import { useSession, getSession } from "next-auth/react";
import { useRouter } from "next/router";
import { toast } from "react-toastify";

const Layout = ({ children, isRestricted }) => {
  const { status, data } = useSession();
  const router = useRouter();

  if (isRestricted && status === "unauthenticated") {
    toast.warning("You need to be authenticated to view this page");
    router.push("/");
  }

  return (
    <>
      <Header />
      <div className={styles.mid}>
        {/* Navigation */}
        <Navbar />

        {/* Contents */}
        {(
          isRestricted ? status !== "unauthenticated" : status !== "loading"
        ) ? (
          <main className={styles.contentWrapper}>{children}</main>
        ) : (
          <h1>Redirecting...</h1>
        )}
      </div>
      <Footer />
    </>
  );
};

// Export the `session` prop to use sessions with Server Side Rendering
export async function getServerSideProps(context) {
  const session = await getSession(context);

  console.log(session);

  return {
    props: {
      session,
    },
  };
}

export default Layout;
