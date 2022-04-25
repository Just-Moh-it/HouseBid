import Layout from "../components/Layout";
import styles from "../styles/Home.module.scss";
import Head from "next/head";
import { useQuery } from "@apollo/client";
import PropertyItemList from "../components/PropertyItem/List";

// Icons
import { toast } from "react-toastify";
import { GET_LISTINGS } from "../lib/queries/Listing";

const HomePage = () => {
  const {
    loading,
    data: listingData,
    error,
  } = useQuery(GET_LISTINGS, {
    variables: {
      limit: 10,
      orderBy: [
        {
          created_at: "desc",
        },
      ],
    },
    onError: (error) => {
      toast.error(`Error occured fetching listings: ${error.message}`);
    },
  });

  return (
    <>
      <Head>
        <title>Explore Properties - HouseBid</title>
      </Head>
      <Layout>
        {loading && !error ? (
          <>Loading...</>
        ) : (
          <>
            <section className={styles.heroSection}>
              {/* <PropertyItemLarge {...dummyData?.hero} /> */}
            </section>
            <section className={styles.featuredSection}>
              <h2 className={["h2"].join(" ")}>Featured Properties</h2>
              <div className={styles.featuredList}>
                <PropertyItemList data={listingData?.listings} />
              </div>
            </section>
          </>
        )}
      </Layout>
    </>
  );
};

import { getSession } from "next-auth/react";

export const getServerSideProps = async ({ req }) => {
  const session = await getSession({ req });

  return {
    props: {
      session,
    },
  };
};

export default HomePage;
