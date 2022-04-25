import React from "react";
import styles from "./index.module.scss";
import { BiPlus } from "react-icons/bi";
import Link from "next/link";

const AddProprtyPrompt = () => {
  return (
    <div className={styles.wrapper}>
      {/* Plus Icon */}
      <Link href="/listings/create" passHref>
        <a className={styles.iconWrapper}>
          <BiPlus size={20} color={"white"} />
        </a>
      </Link>

      {/* Content */}
      <div className={styles.content}>
        {/* Heading */}
        <h2 className="h2">Add Your Property</h2>
        {/* Description */}
        <p className={["p-wide", styles.description].join(" ")}>
          Add your listing for auction, and sell it at the most reasonable price
        </p>
        {/* SubLink */}
        <Link href="#" passHref>
          <a className={["p-wide", styles.sublink].join(" ")}>
            Need any help? Learn More...
          </a>
        </Link>
      </div>

      {/* Button */}
      <Link href="/listings/create" passHref>
        <a className={["btn", "primary", styles.button].join(" ")}>
          Add Your Property
        </a>
      </Link>
    </div>
  );
};

export default AddProprtyPrompt;
