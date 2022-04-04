import Header from "./Header";
import Footer from "./Footer";
import Navbar from "./Navbar";
import styles from "./index.module.scss";

const Layout = ({ children }) => {
  return (
    <>
      <Header />
      <div className={styles.mid}>
        {/* Navigation */}
        <Navbar />

        {/* Contents */}
        <main className={styles.contentWrapper}>{children}</main>
      </div>
      <Footer />
    </>
  );
};

export default Layout;
