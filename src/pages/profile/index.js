import Layout from "../../components/Layout";
import { useQuery } from "@apollo/client";
import { PROFILE_QUERY } from "../../lib/queries/Account";
import { toast } from "react-toastify";

const ProfilePage = () => {
  const {
    loading,
    error,
    data: profileRes,
  } = useQuery(PROFILE_QUERY, {
    variables: {
      usersByPkId: "48997634",
    },
    onError: (error) => {
      toast.error(`Error fetching profile: ${error.message}`);
    },
  });

  const profileData = profileRes?.users_by_pk;

  return (
    <Layout isRestricted>
      {loading && <h1>Loading the data...</h1>}
      {error && <h1>An error occured while loading</h1>}
      {profileData && (
        <>
          <p>User Id: {profileData?.id}</p>
          <h1>{profileData?.name}</h1>
          <p>Joined: {getDateFromTimestamp(profileData?.created_at)}</p>
          <p>
            Total Listings: {profileData.listings_aggregate?.aggregate?.count}
          </p>
        </>
      )}
    </Layout>
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

export default ProfilePage;
