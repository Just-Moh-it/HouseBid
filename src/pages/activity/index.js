import Layout from "../../components/Layout";
import styles from "./index.module.scss";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

import { FaWallet } from "react-icons/fa";
import { FiDownload } from "react-icons/fi";

const ActivityPage = ({ data }) => {
  return (
    <Layout>
      <article className={styles.wrapper}>
        {/* Activity Table */}
        <table className={styles.activityTable}>
          <thead>
            <tr className={styles.thead}>
              <th>Listing</th>
              <th>Tags</th>
              <th>Amount</th>
              <th>Bidder</th>
            </tr>
          </thead>
          <tbody>
            {data.map((row) => (
              <TableRow data={row} key={Math.random()} />
            ))}
          </tbody>
        </table>

        {/* Payments */}
        <motion.div className={styles.paymentWrapper}>
          {/* Balance */}
          <div className={styles.balanceWrapper}>
            {/* Icon */}
            <div className={styles.iconWrapper}>
              <FaWallet size={56} color={"#49505A"} />
            </div>

            <p className={styles.label}>Your Balance</p>
            <h1 className={styles.value}>1,206.89</h1>
            <div className={styles.currencyWrapper}>
              <p>USD</p>
            </div>
            <button className={["btn primary", styles.btn].join(" ")}>
              <FiDownload size="30" color="white" />
              <span>Withdraw</span>
            </button>
          </div>

          {/* All Activity */}
          <div className={styles.activityWrapper}></div>
        </motion.div>
      </article>
    </Layout>
  );
};

const TableRow = ({ data: { listing, tags, amount, bidder } }) => {
  return (
    <tr className={styles.tr}>
      <td className={styles.listing}>
        <div className={styles.imgWrapper}>
          <Image
            src={listing.img.src}
            alt={listing.img.alt}
            layout="fill"
            objectFit="cover"
          />
        </div>
        <Link href={listing.url} passHref>
          <a className={styles.content}>
            <h5 className={styles.title}>{listing.title}</h5>
            <p className={styles.subtext}>{listing.subtext}</p>
          </a>
        </Link>
      </td>
      <td className={styles.tags}>
        {tags.length > 2
          ? [...tags, "..."].slice(0, 2).join(", ")
          : tags.join(", ")}
      </td>
      <td className={styles.amount}>{amount}</td>
      <td className={styles.bidder}>
        <div className={styles.imgWrapper}>
          <Image
            src={bidder.imageURI}
            alt={bidder.name}
            layout="fill"
            objectFit="cover"
          />
        </div>
        <Link href={bidder.url} passHref>
          <a className={styles.content}>
            <h5 className={styles.title}>{bidder.name}</h5>
            <p className={styles.subtext}>on {bidder.date}</p>
          </a>
        </Link>
      </td>
    </tr>
  );
};

export const getServerSideProps = async () => {
  return {
    props: {
      data: dummyData,
    },
  };
};

const dummyData = [...Array(16)].map((i) => ({
  id: "1231",
  listing: {
    img: { src: "/assets/images/museum.jpg", alt: "Museum" },
    title: "Penthouse with 3 roofs",
    subtext: "Listing Added on: 25 Oct, 2015",
    url: "/listing/1231",
  },
  tags: ["Penthouse"],
  amount: "$5,800",
  bidder: {
    name: "Janice Spartan",
    url: "/profile/janice",
    imageURI: "/assets/images/avatar.png",
    date: "25 Oct, 2015",
  },
}));
export default ActivityPage;
