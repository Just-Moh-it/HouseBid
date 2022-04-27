import React from "react";
import { BiMapPin, BiTimeFive, BiUserX } from "react-icons/bi";
import {
  getColoredTime,
  getDateFromTimestamp,
  countDown,
} from "../../../utils/functions";
import Hero, { HeroSkeleton } from "../Large/index";
import Countdown from "react-countdown";

const List = ({ loadingItems, data }) => {
  console.log(data);
  return data && data.length > 0 ? (
    data.map(
      ({
        id,
        created_at,
        short_description,
        minimum_price,
        minimum_increment,
        location_zip_code,
        location_state,
        location_country_code,
        bidding_ends,
        bids_aggregate: {
          aggregate: {
            sum: { increment: total_biddings },
          },
        },
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
            tags={[
              {
                icon: <BiMapPin />,
                name: `${location_state}, ${location_country_code} (${location_zip_code})`,
              },
            ]}
            side={[
              { icon: <BiUserX />, value: user?.name },
              {
                icon: <BiTimeFive />,
                value: `Added: ${getDateFromTimestamp(created_at, "")}`,
              },
            ]}
            title={title}
            description={short_description}
            href={`/listing/${id}`}
            stats={[
              {
                key: `£${minimum_price + total_biddings}`,
                value: "Raised So Far",
              },
              { key: `£${minimum_price ?? "£0"}`, value: "Base Price Set" },
              { key: `£${minimum_increment ?? "£0"}`, value: "Least bid" },
              {
                key: (
                  <Countdown
                    date={new Date(bidding_ends)}
                    renderer={({
                      formatted: { days, hours, minutes, seconds },
                    }) => (
                      <>
                        {getColoredTime(
                          `${days}:${hours}:${minutes}:${seconds}`
                        )}
                      </>
                    )}
                  />
                ),
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
