import Layout from "../../components/Layout";
import styles from "./index.module.scss";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

import { FaWallet } from "react-icons/fa";
import { FiDownload } from "react-icons/fi";

const ActivityPage = ({
  data: { activity: activityData, payments: paymentData },
}) => {
  return (
    <Layout isRestricted>
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
            {activityData?.map((row) => (
              <ActivityTableRow data={row} key={Math.random()} />
            ))}
          </tbody>
        </table>

        {/* Payments */}
        <motion.div className={styles.rightWrapper}>
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

          {/* All Payments */}
          <div className={styles.paymentsWrapper}>
            <div className={styles.headerWrapper}>
              <h3 className={["h3-large", styles.heading].join(" ")}>
                Activity
              </h3>
              <Link href="#" passHref>
                <a className={["h4-bold", styles.link].join(" ")}>View All</a>
              </Link>
            </div>
            <div className={styles.paymentsList}>
              {paymentData?.slice(0, 5).map((payment, i) => (
                <PaymentItem data={payment} key={i} />
              ))}
            </div>
          </div>
        </motion.div>
      </article>
    </Layout>
  );
};

const ActivityTableRow = ({ data: { listing, tags, amount, bidder } }) => {
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

const PaymentItem = ({
  data: { provider, date, time, amount, isWithdraw },
}) => (
  <>
    <div className={styles.paymentItem}>
      {/* Left */}
      <div className={styles.left}>
        <div className={styles.imgWrapper}>
          <Image
            src={provider.imgURI}
            alt={provider.name}
            width={50}
            height={50}
          />
        </div>
        <div className={styles.content}>
          <h5 className={[styles.title, "h4-bold"].join(" ")}>
            {provider.name}
          </h5>
          <p className={[styles.subtext, "p-wide"].join(" ")}>
            {date}, {time}
          </p>
        </div>
      </div>

      {/* Right */}
      <div className={styles.right}>
        <p
          className={[
            styles.amount,
            "h3-mid",
            isWithdraw ? styles.deducted : styles.added,
          ].join(" ")}
        >
          {amount}
        </p>
      </div>
    </div>
  </>
);

import { getSession } from "next-auth/react";

export const getServerSideProps = async () => {
  const session = await getSession({ req });
  return {
    props: {
      session,
      data: { activity: dummyActivityData, payments: dummyPaymentData },
    },
  };
};

const dummyActivityData = [...Array(16)].map((i) => ({
  id: "1231",
  listing: {
    img: { src: "/assets/images/museum.jpg", alt: "Museum" },
    title: "Penthouse with 3 roofs",
    subtext: "Listing Added on: 25 Oct, 2015",
    url: "/listing/1231",
  },
  tags: ["Penthouse"],
  amount: "£5,800",
  bidder: {
    name: "Janice Spartan",
    url: "/profile/janice",
    imageURI: "/assets/images/avatar.png",
    date: "25 Oct, 2015",
  },
}));

const dummyPaymentData = [...Array(15)].map((_) => ({
  provider: { name: "PayPal", imgURI: "/assets/icons/PayPal.svg" },
  date: "31 Oct, 2021",
  time: "11:00 pm",
  amount: "£500",
  isWithdraw: Math.random < 0.5,
}));

export default ActivityPage;
