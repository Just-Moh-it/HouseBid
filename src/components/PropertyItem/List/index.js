import React from "react";
import { BiTimeFive, BiUserX } from "react-icons/bi";
import getColoredTime from "../../../utils/getColoredTime";
import Hero, { HeroSkeleton } from "../Large/index";

const List = ({ loadingItems, data }) => {
  return data && data.length > 0 ? (
    data.map(
      ({
        id,
        created_at,
        short_description,
        minimum_price,
        minimum_increment,
        listing_images,
        title,
        user,
      }) => (
        <>
          <Hero
            id={id}
            key={id}
            img={{
              src: listing_images[0]?.image_uri || "/not-found.png",
              alt: "Image",
            }}
            side={[
              { icon: <BiTimeFive />, value: created_at },
              { icon: <BiUserX />, value: user?.name },
            ]}
            title={title}
            description={short_description}
            href={`/listing/${id}`}
            tags={[]}
            stats={[
              { key: "£250,000", value: "Raised So Far" },
              { key: minimum_price || "£5,000", value: "Base Price Set" },
              {
                key: getColoredTime("10:15:02"),
                value: "Remaining till closure",
              },
            ]}
          />
        </>
      )
    )
  ) : (
    <HeroSkeleton expectedItems={4} />
  );
};

export default List;
