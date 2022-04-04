import Layout from "../../components/Layout";
import styles from "./index.module.scss";
import Hero from "../../components/Hero";
import { BiBuildingHouse } from "react-icons/bi";
import { RiMap2Fill } from "react-icons/ri";
import AddProprtyPrompt from "../../components/AddPropertyPrompt";
import getColoredTime from "../../utils/getColoredTime";

const data = [
  {
    img: { src: "/assets/images/museum.jpg", alt: "musuem" },
    title: "Picturesque auditorium with a thousand people capacity",
    description:
      "Remake - We Make: an exhibition about architecture’s social agency in the face of urbanisation",
    href: "/property/iajahskf",
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
      { key: "$250,000", value: "Raised So Far" },
      { key: "$5,000", value: "Base Price Set" },
      { key: getColoredTime("10:15:02"), value: "Remaining till closure" },
    ],
  },
  {
    img: { src: "/assets/images/house.avif", alt: "musuem" },
    title: "Picturesque auditorium with a thousand people capacity",
    description:
      "Remake - We Make: an exhibition about architecture’s social agency in the face of urbanisation",
    href: "/property/iajahskf",
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
      { key: "$250,000", value: "Raised So Far" },
      { key: "$5,000", value: "Base Price Set" },
      { key: getColoredTime("10:15:02"), value: "Remaining till closure" },
    ],
  },
  {
    img: { src: "/assets/images/house-garden.jpg", alt: "musuem" },
    title: "Picturesque auditorium with a thousand people capacity",
    description:
      "Remake - We Make: an exhibition about architecture’s social agency in the face of urbanisation",
    href: "/property/iajahskf",
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
      { key: "$250,000", value: "Raised So Far" },
      { key: "$5,000", value: "Base Price Set" },
      { key: getColoredTime("10:15:02"), value: "Remaining till closure" },
    ],
  },
];

const ListingsPage = () => {
  return (
    <Layout>
      <div className={styles.wrapper}>
        {/* Create Listing */}
        <AddProprtyPrompt />

        {/* List */}
        <h3 className={["h3-large", styles.heading].join(" ")}>
          Your Listings <span className="text-secondary">({data.length})</span>
        </h3>
        <div className={styles.listingList}>
          {data.map((listing) => (
            <Hero {...listing} />
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default ListingsPage;
