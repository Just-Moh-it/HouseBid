import styles from "./index.module.scss";
import Image from "next/image";
import Link from "next/link";
import { Popover } from "@headlessui/react";

const Header = () => {
  return (
    <>
      <header className={styles.container}>
        {/* Left Bar */}
        <div className={styles.left}>
          {/* Logo */}
          <Link href="/" passHref>
            <a className={styles.logo}>
              <Image width={64} height={65} src="/assets/images/logo.svg" />
            </a>
          </Link>

          {/* Search Bar */}
          <div className={styles.searchContainer}>
            {/* TextBox */}
            <input
              className={styles.searchTextBox}
              placeholder="Search for properties"
            />
            {/* Search Button */}
            <button
              className={[styles.searchBtn, "btn"].join(" ")}
            >
              {/* Icon */}
              <Image src="/assets/icons/search.svg" width="20" height="20" />
            </button>
          </div>
        </div>

        {/* Right Bar */}
        <div className={styles.right}>
          {/* Category Selector */}
          <Popover className={styles.categoryWrapper}>
            {/* Icon */}
            <Popover.Button className={styles.categoryBtn}>
              <Image src="/assets/icons/rise.svg" width="26" height="16" />
              {/* Text */}
              <span className={styles.text}>Looking for</span>
              {/* Dropdown Icon */}
              <Image src="/assets/icons/down-arrow.svg" width="16" height="8" />
            </Popover.Button>

            <Popover.Panel>Categories here...</Popover.Panel>
          </Popover>

          {/* Add Proprty CTA */}
          <Link href="/listings/create" passHref>
            <a className={[styles.addProperty, "btn primary"].join(" ")}>
              Add your property
            </a>
          </Link>

          {/* User Avatar Popover */}
          <Popover className={styles.avatarWrapper}>
            <Popover.Button>
              <Image src="/assets/images/avatar.png" height="65" width="65" />
            </Popover.Button>

            <Popover.Panel className="absolute z-10">Hello world</Popover.Panel>
          </Popover>
        </div>
      </header>
    </>
  );
};

export default Header;
