import Layout from "../../components/Layout";
import { useRouter } from "next/router";
import { GET_LISTINGS } from "../../lib/queries/Listing";
import PropertyList from "../../components/PropertyItem/List";
import { useQuery } from "@apollo/client";
import styles from "./index.module.scss";
import Lottie from "react-lottie";
import four0fourAnimationdata from "../../lotties/four-0-four.json";

const SearchPage = () => {
  const router = useRouter();
  const { query } = router?.query;

  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: four0fourAnimationdata,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  const {
    data: res,
    loading,
    error,
  } = useQuery(GET_LISTINGS, {
    variables: {
      where: {
        _or: [
          {
            listing_features: {
              listing_value: {
                _ilike: `%${query}%`,
              },
            },
          },
          {
            listing_tags: {
              value: {
                _ilike: `%${query}%`,
              },
            },
          },
          {
            title: {
              _ilike: `%${query}%`,
            },
          },
          {
            user: {
              name: { _ilike: `%${query}%` },
            },
          },
        ],
      },
    },
  });

  const searchData = res?.listings;

  return (
    <Layout>
      <h1>
        {searchData && (
          <span className="text-secondary">{searchData?.length} </span>
        )}
        Search Results for{" "}
        <span className="text-secondary">&quot;{query}&quot;</span>
      </h1>
      {/* Search results */}
      {loading && <h3>Loading...</h3>}
      {searchData && searchData.length ? (
        <PropertyList loadingItems={5} data={searchData} />
      ) : (
        <div className={styles.four0four}>
          <Lottie options={defaultOptions} height={400} width={400} />
          <h1>404 - Not Found</h1>
          <p>We weren&apos;t able to find what you were looking for...</p>
        </div>
      )}
    </Layout>
  );
};

export default SearchPage;
