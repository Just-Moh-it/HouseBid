import { useState } from "react";
import styles from "./index.module.scss";
import Link from "next/link";
import { useSession, signIn } from "next-auth/react";
import AvatarPopover from "./AvatarPopover";
import TagsPopover from "./TagsPopover";
import Image from "next/image";
import { useRouter } from "next/router";

const Header = () => {
  const { status } = useSession();
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <>
      <header className={styles.container}>
        {/* Left Bar */}
        <div className={styles.left}>
          {/* Logo */}
          <Link href="/" passHref>
            <a className={styles.logo}>
              <Image
                width={64}
                height={65}
                src="/assets/images/logo.svg"
                alt="logo"
              />
            </a>
          </Link>

          {/* Search Bar */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              router.push(`/search/${searchQuery}`);
            }}
            className={styles.searchContainer}
          >
            {/* TextBox */}
            <input
              className={styles.searchTextBox}
              placeholder="Search for properties"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            {/* Search Button */}
            <button className={[styles.searchBtn, "btn"].join(" ")}>
              {/* Icon */}
              <Image
                src="/assets/icons/search.svg"
                width="20"
                height="20"
                alt="search"
              />
            </button>
          </form>
        </div>

        {/* Right Bar */}
        <div className={styles.right}>
          {/* Tags Selector */}
          <TagsPopover />

          {
            {
              loading: <></>,
              authenticated: (
                <>
                  {/* Add Proprty CTA */}
                  <Link href="/listings/create" passHref>
                    <a
                      className={[styles.addProperty, "btn primary"].join(" ")}
                    >
                      Add your listing
                    </a>
                  </Link>

                  {/* User Avatar Popover */}
                  <AvatarPopover />
                </>
              ),
              unauthenticated: (
                // Login Button
                <button
                  className={["btn secondary", styles.loginBtn].join(" ")}
                  onClick={signIn}
                >
                  Login
                </button>
              ),
            }[status]
          }
        </div>
      </header>
    </>
  );
};

export default Header;
