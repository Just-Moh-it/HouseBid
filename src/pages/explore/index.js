import Layout from "../../components/Layout";
import styles from "./index.module.scss";
import Hero from "../../components/Hero";
import Head from "next/head";

// Icons
import { BiBuildingHouse } from "react-icons/bi";
import { RiMap2Fill } from "react-icons/ri";

const ExplorePage = () => {
  return (
    <>
      <Head>
        <title>Explore Properties - HouseBid</title>
      </Head>
      <Layout>
        <section className={styles.heroSection}>
          <Hero
            img={{ src: "/assets/images/museum.jpg", alt: "musuem" }}
            title="Picturesque auditorium with a thousand people capacity"
            description="Remake - We Make: an exhibition about architecture’s social
            agency in the face of urbanisation"
            href="/property/iajahskf"
            tags={[
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
            ]}
            side={[
              {
                icon: <RiMap2Fill />,
                value: "301705",
              },
            ]}
            stats={[
              { key: "$250,000", value: "Raised So Far" },
              { key: "$5,000", value: "Base Price Set" },
              { key: "10H:15M:02S", value: "Remaining till closure" },
            ]}
          />
        </section>
      </Layout>
    </>
  );
};

export default ExplorePage;
