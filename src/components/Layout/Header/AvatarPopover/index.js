import styles from "./index.module.scss";
import { Popover } from "@headlessui/react";
import { signOut } from "next-auth/react";
import Image from "next/image";
import PopoverLink from "../PopoverLink";
import { useSession } from "next-auth/react";

// Icons
import { FiLogOut, FiUser, FiSettings, FiList } from "react-icons/fi";

const AvatarPopover = () => {
  const { data: session } = useSession();

  return (
    <Popover className={styles.avatarWrapper}>
      <Popover.Button className={styles.button}>
        <Image
          src={session?.user?.image || "/assets/images/avatar.png"}
          layout="fill"
          objectFit="cover"
          alt="avatar"
        />
      </Popover.Button>
      <Popover.Panel className={[styles.panel, "popover-panel-base"].join(" ")}>
        <PopoverLink href="/listings">
          <FiList size={18} color="#B5B5B7" />
          Your Listings
        </PopoverLink>
        <PopoverLink href="/profile">
          <FiUser size={18} color="#B5B5B7" />
          Profile
        </PopoverLink>
        <hr />
        <PopoverLink href="/settings">
          <FiSettings size={18} color="#B5B5B7" />
          Settings
        </PopoverLink>
        <button className={["link danger"]} onClick={signOut}>
          <FiLogOut size={18} color="#B5B5B7" />
          Sign out
        </button>
      </Popover.Panel>
    </Popover>
  );
};

export default AvatarPopover;
