import Link from "next/link";
import styles from "./index.module.scss";
import Image from "next/image";
import { useRouter } from "next/router";
import useTheme from "../../../utils/useTheme";
import { BiSun } from "react-icons/bi";

const Navbar = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <nav className={styles.wrapper}>
      {/* Top Icons */}
      <div className={styles.top}>
        <NavItem
          icon={{ src: "/assets/icons/Cubes.svg", alt: "Explore" }}
          href="/explore"
        />
        <NavItem
          icon={{ src: "/assets/icons/Announce.svg", alt: "Your Listings" }}
          href="/listings"
        />
        <NavItem
          icon={{ src: "/assets/icons/Cash.svg", alt: "Transactions" }}
          href="/activity"
        />
        <NavItem
          icon={{ src: "/assets/icons/User.svg", alt: "Your Profile" }}
          href="/profile"
        />
        <NavItem
          icon={{ src: "/assets/icons/Logout.svg", alt: "Logout >" }}
          href="/logout"
        />
      </div>

      {/* Bottom Icons */}
      <div className={styles.bottom}>
        <button
          className={["btn", styles.themeBtn].join(" ")}
          onClick={toggleTheme}
        >
          <BiSun size={24} />
        </button>
      </div>
    </nav>
  );
};

const NavItem = ({ href = "/", icon: { src, alt, width, height } }) => {
  const router = useRouter();

  return (
    <Link href={href} passHref>
      <a
        className={[
          styles.navItem,
          href === "/"
            ? router.pathname === href
            : router.pathname.startsWith(href)
            ? styles.active
            : "",
        ].join(" ")}
      >
        <Image src={src} alt={alt} height={height || 20} width={width || 20} />
      </a>
    </Link>
  );
};

export default Navbar;
