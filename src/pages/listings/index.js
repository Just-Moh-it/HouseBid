import Layout from "../../components/Layout";
import styles from "./index.module.scss";
import Hero from "../../components/PropertyItem/Large";
import { BiBuildingHouse } from "react-icons/bi";
import { RiMap2Fill } from "react-icons/ri";
import AddProprtyPrompt from "../../components/AddPropertyPrompt";
import { getColoredTime } from "../../utils/functions";
import { useSession } from "next-auth/react";
import { GET_LISTINGS } from "../../lib/queries/Listing";
import { useQuery } from "@apollo/client";
import { getSession } from "next-auth/react";
import { toast } from "react-toastify";
import PropertyItemList from "../../components/PropertyItem/List";

const data = [Array(5)].map((_) => ({
  id: "1",
  img: { src: "/assets/images/museum.jpg", alt: "musuem" },
  title: "Picturesque auditorium with a thousand people capacity",
  description:
    "Remake - We Make: an exhibition about architecture’s social agency in the face of urbanisation",
  href: "/listing/iajahskf",
  tags: [
    {
      icon: <BiBuildingHouse />,
      name: "3 BHK",
    },
    {
      icon: <BiBuildingHouse />,
      name: "3 BHK",
    },
    {
      icon: <BiBuildingHouse />,
      name: "3 BHK",
    },
    {
      icon: <BiBuildingHouse />,
      name: "3 BHK",
    },
  ],
  side: [
    {
      icon: <RiMap2Fill />,
      value: "301705",
    },
  ],
  stats: [
    { key: "£250,000", value: "Raised So Far" },
    { key: "£5,000", value: "Base Price Set" },
    { key: getColoredTime("10:15:02"), value: "Remaining till closure" },
  ],
}));

const ListingsPage = () => {
  const { data: sessionData } = useSession();

  const { data: personalListingsData, loading } = useQuery(GET_LISTINGS, {
    variables: {
      where: {
        user_id: {
          _eq: sessionData?.user?.id,
        },
      },
    },
    onError: (error) =>
      toast.error(`Error fetching listings: ${error?.message}`),
  });

  return (
    <Layout isRestricted>
      <div className={styles.wrapper}>
        {/* Create Listing */}
        <AddProprtyPrompt />

        {/* List */}
        <h3 className={["h3-large", styles.heading].join(" ")}>
          Your Listings{" "}
          <span className="text-secondary">
            ({personalListingsData?.listings.length || "..."})
          </span>
        </h3>
        <div className={styles.listingList}>
          <PropertyItemList data={personalListingsData?.listings} />
        </div>
      </div>
    </Layout>
  );
};
export default ListingsPage;

export async function getServerSideProps(ctx) {
  return {
    props: {
      session: await getSession(ctx),
    },
  };
}
