import Link from "next/link";
import styles from "./index.module.scss";

const PopoverLink = ({ children, classNames, ...props }) => (
  <Link {...props} passHref>
    <a
      className={[
        "link",
        ...(classNames ? classNames : ""),
        styles.popoverLink,
      ].join(" ")}
    >
      {children}
    </a>
  </Link>
);

export default PopoverLink;
