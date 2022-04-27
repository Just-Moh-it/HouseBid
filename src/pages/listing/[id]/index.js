import { useState } from "react";
import Layout from "../../../components/Layout";
import { useRouter } from "next/router";
import styles from "./index.module.scss";
import { useMutation, useQuery, useSubscription } from "@apollo/client";
import {
  GET_SINGLE_LISTING,
  GET_LISTINGS,
  GET_BIDDINGS_LIVE,
  CREATE_BID,
  UPDATE_LISTING,
} from "../../../lib/queries/Listing";
import { toast } from "react-toastify";
import { featureOptions } from "../../../utils/constants";
import {
  getCountryNameByCode,
  getDateFromTimestamp,
  getTagInfoByValue,
} from "../../../utils/functions";
import { SubHeadingWrapper } from "../../../components/PropertyItem/Large";
import getStripe from "../../../lib/getStripe";
import axios from "axios";
import { useForm } from "react-hook-form";
import { Line } from "react-chartjs-2";
import Chart from "chart.js/auto";
import { useSession } from "next-auth/react";
import { v4 as uuid } from 'uuid'
import Alert from "../../../components/Alert";

import {
  BiCalendar,
  BiCategoryAlt,
  BiHourglass,
  BiMoney,
  BiTime,
  BiUser,
  BiUserVoice,
} from "react-icons/bi";

import Countdown from "react-countdown";
import ImageViewer from "../../../components/Listing/ImageViewer";
import FeaturesList from "../../../components/Listing/FeaturesList";
import PropertyList from "../../../components/PropertyItem/List";

const PropertyPage = ({ id }) => {
  const [isReadingMore, setIsReadingMore] = useState(false);
  const router = useRouter();
  // Get id from params
  const { id: listingId } = id ? { id } : router.query;
  const { data: listingRes } = useSubscription(GET_SINGLE_LISTING, {
    variables: {
      listingsByPkId: listingId,
    },
    onError: (error) => {
      toast.error(`Error loading property: ${error.message}`);
    },
  });
  const [isShowingInfo, setIsShowingInfo] = useState(true);

  const { data: recommendationsRes } = useQuery(GET_LISTINGS, {
    variables: {
      limit: 10,
      where: {
        id: {
          _neq: listingId,
        },
      },
      orderBy: [
        {
          created_at: "desc",
        },
      ],
    },
    onError: (error) => {
      toast.error(`Error occured fetching listings: ${error.message}`);
    },
  });

  const toggleIsShowingInfo = () => setIsShowingInfo(!isShowingInfo);

  const listingData = {
    bidding_ended:
      new Date(listingRes?.listings_by_pk?.bidding_ends) <= new Date(),
    ...listingRes?.listings_by_pk,
  };
  const recommendationsData = recommendationsRes?.listings;

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

            {isShowingInfo ? (
              <div className={styles.infoWrapper}>
                {/* Right Information */}
                <section className={styles.hero}>
                  {/* Subheading */}
                  <div className={styles.subheading}>
                    <SubHeadingWrapper
                      tags={listingData.listing_tags.map(
                        ({ tag: { value } }) => {
                          const vals = getTagInfoByValue(value);
                          return { icon: vals.icon, name: vals.label };
                        }
                      )}
                      side={[
                        { icon: <BiUser />, value: listingData.user.name },
                      ]}
                    />
                  </div>
                  {/* Title */}
                  <h1 className={styles.title}>{listingData.title}</h1>
                  {/* Short Description */}
                  <p className={[styles.shortDescription, "p-wide"].join(" ")}>
                    {listingData.short_description}
                  </p>
                </section>

                {/* CTAs */}
                <section className={styles.ctas}>
                  <button
                    onClick={() => toast.warning("Bidding hasn't started yet")}
                    className="btn primary"
                  >
                    Enter Bidding
                  </button>
                  <button onClick={toggleIsShowingInfo} className="btn outline">
                    View Live Bids
                  </button>
                </section>

                {/* Stats */}
                <section className={styles.stats}>
                  <h2 className="h2">About the property</h2>
                  <FeaturesList
                    features={[
                      {
                        icon: <BiCalendar />,
                        key: "Date Published",
                        value: getDateFromTimestamp(listingData.created_at),
                      },
                      {
                        icon: <BiMoney />,
                        key: "Starting Price",
                        value: `￡ ${listingData.minimum_price}`,
                      },
                      {
                        icon: <BiCategoryAlt />,
                        key: "Minimum Bid",
                        value: `￡ ${listingData.minimum_increment}`,
                      },
                      {
                        icon: <BiUserVoice />,
                        key: "Bidders so far",
                        value: listingData.bids_aggregate.aggregate.count,
                      },
                      {
                        icon: <BiTime />,
                        key: "Bidders open till",
                        value: getDateFromTimestamp(listingData.bidding_ends),
                      },
                      {
                        icon: <BiHourglass />,
                        key: "Bidding closing in",
                        value: (
                          <Countdown
                            date={new Date(listingData?.bidding_ends)}
                            renderer={({
                              formatted: { days, hours, minutes, seconds },
                            }) => `${days}:${hours}:${minutes}:${seconds}`}
                          />
                        ),
                      },
                    ]}
                  />
                </section>

                {/* Long Description Collapsible */}
                <section className={styles.longDescription}>
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
                </section>

                {/* Features */}
                <section className={styles.features}>
                  <h2 className="h2">
                    Features{" "}
                    <span className="text-secondary">
                      ({listingData.listing_features.length})
                    </span>
                  </h2>

                  <div className={styles.featuresList}>
                    {listingData.listing_features.map(
                      ({ feature: { title, value } }) => (
                        <div className={styles.featureItem} key={value}>
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
                </section>

                {/* Location */}
                <section className={styles.location}>
                  {/* Heading */}
                  <h2 className="h2">Location</h2>
                  {/* Full address Field */}
                  <p className={["p-wide", styles.locationText].join(" ")}>{`${
                    listingData?.location_address
                  }, ${listingData?.location_state}, ${getCountryNameByCode(
                    listingData.location_country_code
                  )} (${listingData?.location_zip_code})`}</p>
                  {/* Map */}
                  <div className={styles.mapWrapper}>
                    <iframe
                      className={styles.map}
                      title="Map"
                      src={`https://maps.google.com/maps?q=${listingData.location_address}, ${listingData?.location_city}, ${listingData.location_state} (${listingData.location_country_code})&output=embed`}
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                    />
                  </div>
                </section>
              </div>
            ) : (
              <BiddingsComponent
                listingData={listingData}
                toggleIsShowingInfo={toggleIsShowingInfo}
              />
            )}
          </div>

          {/* Bottom Recommendations */}
          {recommendationsData?.length > 0 && (
            <div className={styles.bottomWrapper}>
              <h3 className="h3-large">Similar Properties you might like</h3>
              <PropertyList
                data={recommendationsData}
                loadingItems={3}
              ></PropertyList>
            </div>
          )}
        </div>
      )}
    </Layout>
  );
};

const BiddingsComponent = ({ toggleIsShowingInfo, listingData }) => {
  // const { data, loading, error } = useQuery(GET_BIDDINGS_LIVE);
  const { data: session } = useSession();
  const [isShowingAlert, setIsShowingAlert] = useState(true);

  const { data: biddingRes, loading } = useSubscription(GET_BIDDINGS_LIVE, {
    variables: {
      orderBy: [
        {
          created_at: "asc",
        },
      ],
    },
  });
  const { register, handleSubmit, errors, reset } = useForm();
  const [createBid, { loading: createBidLoading }] = useMutation(CREATE_BID, {
    onError: (err) =>
      toast.error(`Error occured creating bid: ${err?.message}`),
    onCompleted: ({ insert_bids_one: { id } }) => {
      toast(`Bid with id ${id} added!`);
    },
  });
  const [endBid] = useMutation(UPDATE_LISTING, {
    onError: (err) =>
      toast.error(`Error occured creating bid: ${err?.message}`),
    onCompleted: ({ insert_bids_one: { id } }) => {
      toast(`Bidding Ended!`);
    },
    variables: {
      pkColumns: {
        id: listingData?.id,
      },
      set: {
        bidding_ends: new Date().toISOString(),
      },
    },
  });

  const redirectToCheckout = async () => {
    const amount =
      (listingData?.minimum_price +
        listingData.bids_aggregate.aggregate.sum.increment) *
      100;
    if (!amount) return toast.warning("The amount can't be zero");

    // Create Stripe checkout
    try {
      const {
        data: { id },
      } = await axios.post("/api/checkout_sessions", {
        items: [
          {
            price_data: {
              currency: "inr",
              unit_amount: amount,
              product_data: {
                name: listingData?.title,
                description: listingData?.shortDescription,
              },
            },
            quantity: 1,
          },
        ],
        success_url_path: `listing/${listingData?.id}`,
        cancel_url_path: `listing/${listingData?.id}`,
      });

      // Redirect to checkout
      const stripe = await getStripe();
      await stripe.redirectToCheckout({ sessionId: id });
    } catch (err) {
      toast.error(`Payment Error occured: ${err?.message}`);
    }
  };

  const toggleAlert = () => setIsShowingAlert(!isShowingAlert);

  const biddingData = biddingRes?.bids;
  const biddingDataAsc = biddingData?.length && biddingData?.reverse();

  let data;

  let sumTillNow = listingData?.minimum_price;

  if (biddingData?.length) {
    console.log(sumTillNow);
    data = {
      labels: biddingDataAsc
        .reverse()
        ?.map(({ is_anonymous, user: { name: userName } }) =>
          is_anonymous ? "Anonymous" : userName
        ),
      datasets: [
        {
          label: "Increments",
          data: biddingDataAsc?.map(({ increment }) => {
            return increment;
          }),
          fill: true,
          fill: false,
          borderColor: "#742774",
        },
        {
          label: "Cumulative Amount",
          data: biddingDataAsc?.map(({ increment }) => {
            sumTillNow += increment;
            return sumTillNow;
          }),
          backgroundColor: "rgba(75,192,192,0.2)",
          borderColor: "rgba(75,192,192,1)",
        },
      ],
    };
  }

  const onSubmit = (data) => {
    console.log(data);
    createBid({
      variables: {
        object: {
          increment: data.bidAmount,
          listing_id: listingData?.id,
          is_anonymous: data.isAnonymous,
        },
      },
    });
  };

  if (biddingData?.length) {
    console.log("Biddings", biddingData);
    console.log("Ended", listingData?.bidding_ended);
    console.log("Session User Id", session.user.id);
    console.log("Winner User Id", biddingData?.slice(-1)[0].user.id);
  }

  return (
    <div className={styles.biddingsWrapper}>
      <button onClick={toggleIsShowingInfo}>Back</button>

      {/* Ended Alert */}
      {isShowingAlert &&
        biddingData?.length &&
        listingData?.bidding_ended &&
        session.user.id === biddingData?.slice(-1)[0].user.id && (
          <Alert onClose={toggleAlert} title="The results are here!">
            You won the Bids!
            <button
              className={["btn primary"].join(" ")}
              onClick={redirectToCheckout}
            >
              Checkout with Stripe
            </button>
          </Alert>
        )}

      <h1 className={styles.heading}>Bidding for {listingData?.title}</h1>
      {/* Create Bid */}
      <form className={styles.createBid} onSubmit={handleSubmit(onSubmit)}>
        {/* Info */}
        <div className={["formGroup"].join(" ")}>
          {/* Title */}
          <label htmlFor="bidAmount">Bidding Amount</label>
          <input
            type="text"
            className="text-input"
            id="bidAmount"
            {...register("bidAmount", {
              required: true,
              min: listingData.min_increment,
            })}
            placeholder={`Greater than ${listingData?.minimum_increment}`}
          />
          {errors?.bidAmount && (
            <span className={styles.errorMessage}>This field is required</span>
          )}
        </div>
        {/* Info */}
        <div>
          {/* Title */}
          <input
            type="checkbox"
            className={styles.checkbox}
            id="isAnonymous"
            {...register("isAnonymous")}
            placeholder="Enter Property name"
          />
          <label htmlFor="isAnonymous">Vote Anonymously</label>
        </div>

        <button
          disabled={createBidLoading}
          className={[styles.button, "btn primary"].join(" ")}
        >
          <span>{!createBidLoading ? "Place Bid" : "Adding..."}</span>
        </button>

        {/* End Bidding */}

        {session?.user?.id === listingData?.user?.name && (
          <button
            onClick={(e) => {
              e.preventDefault();
              endBid();
            }}
            className={[styles.button, "btn outline"].join(" ")}
          >
            <span>End Bidding</span>
          </button>
        )}
      </form>

      {/* Current Biddings */}
      <section className={styles.currentBiddings}>
        <h2>Current Biddings</h2>
        <FeaturesList
          features={[
            {
              icon: <BiCalendar />,
              key: "Date Published",
              value: getDateFromTimestamp(listingData.created_at),
            },
            {
              icon: <BiMoney />,
              key: "Starting Price",
              value: `￡ ${listingData.minimum_price}`,
            },
            {
              icon: <BiCategoryAlt />,
              key: "Minimum Bid",
              value: `￡ ${listingData.minimum_increment}`,
            },
            {
              icon: <BiUserVoice />,
              key: "Bids so far",
              value: listingData.bids_aggregate.aggregate.count,
            },
            {
              icon: <BiTime />,
              key: "Bidding open till",
              value: getDateFromTimestamp(listingData.bidding_ends),
            },
            {
              icon: <BiHourglass />,
              key: "Bidding closing in",
              value: (
                <Countdown
                  date={new Date(listingData?.bidding_ends)}
                  renderer={({
                    formatted: { days, hours, minutes, seconds },
                  }) => `${days}:${hours}:${minutes}:${seconds}`}
                />
              ),
            },
          ]}
        />

        {/* Past Bidders */}
        {biddingData?.length && (
          <div className={styles.biddersAndCharts}>
            <div className={styles.pastBiddersListWrapper}>
              <h2>Past Bidders</h2>

              <ul className={styles.pastBiddersList}>
                {biddingData?.reverse().map((bid) => (
                  <li key={uuid()}>
                    {/* Username */}
                    <h3
                      className={[
                        styles.middle,
                        bid.is_anonymous ? styles.anonymousText : "",
                      ].join(" ")}
                    >
                      {bid.is_anonymous ? "Anonymous" : bid.user.name}
                    </h3>
                    {/* Content */}
                    <p className={[styles.increase, "text-accent"].join(" ")}>
                      +￡{bid.increment}
                    </p>
                  </li>
                ))}
              </ul>
            </div>
            {/* Charts */}
            <div className={styles.chartWrapper}>
              <h2>Cumulative Bids (in ￡)</h2>
              {/* Chart */}
              <div className={styles.chart}>
                <Line data={data} />
              </div>
            </div>
          </div>
        )}
      </section>
    </div>
  );
};

import { getSession } from "next-auth/react";

export const getServerSideProps = async ({ req }) => {
  const session = await getSession({ req });

  return {
    props: {
      session,
    },
  };
};

export default PropertyPage;
