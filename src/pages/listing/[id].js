import { useState } from "react";
import Layout from "../../components/Layout";
import { useRouter } from "next/router";
import styles from "./index.module.scss";
import { useQuery } from "@apollo/client";
import { GET_SINGLE_LISTING } from "../../lib/queries/Listing";
import { toast } from "react-toastify";
import { featureOptions } from "../../utils/constants";

import { BiCalendar, BiCategoryAlt, BiDirections } from "react-icons/bi";

import ImageViewer from "../../components/Listing/ImageViewer";
import FeaturesList from "../../components/Listing/FeaturesList";

const PropertyPage = () => {
  const [isReadingMore, setIsReadingMore] = useState(false);
  const router = useRouter();
  // Get id from params
  const { id: proprtyId } = router.query;
  const { data: listingRes, loading } = useQuery(GET_SINGLE_LISTING, {
    variables: {
      listingsByPkId: proprtyId,
    },
    onError: (error) => {
      toast.error(`Error loading property: ${error.message}`);
    },
  });

  const listingData = listingRes?.listings_by_pk;
  console.log("Listing Data", listingData);

  return (
    <Layout>
      {listingData && listingData.title && (
        <div className={styles.wrapper}>
          <div className={styles.contentWrapper}>
            {/* Left Images */}
            <div className={styles.imagesWrapper}>
              <ImageViewer
                images={listingData?.listing_images?.map(
                  (img) => img.image_uri
                )}
              />
            </div>

            {/* Right Information */}
            <div className={styles.infoWrapper}>
              {/* Subheading */}
              <div className={styles.subheading}></div>

              {/* Title */}
              <h1 className={styles.title}>{listingData.title}</h1>

              {/* Short Description */}
              <p className={[styles.shortDescription, "p-wide"].join(" ")}>
                {listingData.short_description}
              </p>

              {/* CTAs */}
              <div className={styles.ctas}>
                <button
                  onClick={() => toast.warning("Bidding hasn't started yet")}
                  className="btn primary"
                >
                  Enter Bidding
                </button>
                <button
                  onClick={() => toast.warning("Bidding hasn't started yet")}
                  className="btn outline"
                >
                  View Live Bids
                </button>
              </div>

              {/* Stats */}
              <div className={styles.stats}>
                <h2 className="h2">About the property</h2>
                <FeaturesList
                  features={[
                    {
                      icon: <BiCalendar />,
                      key: "Date Published",
                      value: listingData.created_at,
                    },
                    {
                      icon: <BiDirections />,
                      key: "Total Units",
                      value: 1,
                    },
                    {
                      icon: <BiCategoryAlt />,
                      key: "Project Type",
                      value: "Builder Floor",
                    },
                    {
                      icon: <BiCalendar />,
                      key: "Date Published",
                      value: listingData.created_at,
                    },
                    {
                      icon: <BiCalendar />,
                      key: "Date Published",
                      value: listingData.created_at,
                    },
                  ]}
                />
              </div>

              {/* Long Description Collapsible */}
              <div className={styles.longDescription}>
                <div className={[styles.content, "p-wide"].join(" ")}>
                  {!isReadingMore
                    ? `${listingData.long_description.slice(0, 500)}...`
                    : listingData.long_description}
                </div>
                {listingData?.long_description.length > 500 && (
                  <div
                    role="button"
                    className={[styles.readMore, "p-compact-large"].join(" ")}
                    onClick={() => setIsReadingMore(!isReadingMore)}
                  >
                    {isReadingMore ? "↑ Read Less" : "↓ Read More..."}
                  </div>
                )}
              </div>

              {/* Features */}
              <div className={styles.features}>
                <h2 className="h2">
                  Features{" "}
                  <span className="text-secondary">
                    ({listingData.listing_features.length})
                  </span>
                </h2>

                <div className={styles.featuresList}>
                  {listingData.listing_features.map(
                    ({ feature: { title, value } }) => (
                      <div className={styles.featureItem}>
                        {/* Icon */}
                        <div className={styles.icon}>
                          {
                            featureOptions.filter((x) => x.value === value)[0]
                              ?.icon
                          }
                        </div>

                        {/* Text */}
                        <span className="p-compact-small">{title}</span>
                      </div>
                    )
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Recommendations */}
          <div className={styles.bottomWrapper}>
            <h3 className="h3-large">You may also like</h3>
          </div>
        </div>
      )}
    </Layout>
  );
};

export default PropertyPage;
