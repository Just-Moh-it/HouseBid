import styles from "./index.module.scss";
import { Popover } from "@headlessui/react";
import Image from "next/image";
import PopoverLink from "../PopoverLink";
import { useQuery } from "@apollo/client";
import { GET_TAGS } from "../../../../lib/queries/Tags.js";
import { toast } from "react-toastify";
import { tagOptions } from "../../../../utils/constants";

const TagsPopover = () => {
  const {
    loading,
    data: tagsRes,
    error,
  } = useQuery(GET_TAGS, {
    onError: (error) => toast.error(`Error fetching tags: ${error.message}`),
  });

  const tagsData = tagsRes?.tags;

  return (
    <Popover className={styles.categoryWrapper}>
      {/* Icon */}
      <Popover.Button className={styles.categoryBtn}>
        <Image
          src="/assets/icons/rise.svg"
          width="26"
          height="16"
          alt="category"
        />
        {/* Text */}
        <span className={styles.text}>Looking for</span>
        {/* Dropdown Icon */}
        <Image
          src="/assets/icons/down-arrow.svg"
          width="16"
          height="8"
          alt="category"
        />
      </Popover.Button>

      <Popover.Panel className={[styles.panel, "popover-panel-base"].join(" ")}>
        {loading && <p>Loading...</p>}
        {error && <p>Error...</p>}
        {tagsData?.length &&
          tagsData.map(({ label, value }) => (
            <PopoverLink href="/" key={value}>
              {tagOptions.filter((x) => x.value === value)[0]?.icon} {label}
            </PopoverLink>
          ))}
      </Popover.Panel>
    </Popover>
  );
};

export default TagsPopover;
