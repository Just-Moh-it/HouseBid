import { gql } from "@apollo/client";

export const CREATE_LISTING = gql`
  mutation createListing($object: listings_insert_input!) {
    insert_listings_one(object: $object) {
      id
    }
  }
`;

export const GET_LISTINGS = gql`
  query Listings(
    $limit: Int
    $orderBy: [listings_order_by!]
    $where: listings_bool_exp
  ) {
    listings(limit: $limit, order_by: $orderBy, where: $where) {
      title
      created_at
      updated_at
      user {
        name
      }
      listing_images(limit: 1) {
        image_uri
      }
      short_description
      minimum_price
      minimum_increment
      id
      listing_features {
        feature {
          title
          value
        }
      }
      listing_tags {
        tag {
          label
          value
        }
      }
      location_zip_code
      location_state
      location_country_code
      location_city
      bidding_ends
      bids_aggregate {
        aggregate {
          sum {
            increment
          }
        }
      }
    }
  }
`;

export const GET_SINGLE_LISTING = gql`
  subscription Listings_by_pk($listingsByPkId: bigint!) {
    listings_by_pk(id: $listingsByPkId) {
      id
      listing_images {
        image_uri
      }
      long_description
      minimum_increment
      minimum_price
      short_description
      title
      updated_at
      created_at
      user {
        name
        id
      }
      listing_features {
        feature {
          title
          value
        }
      }
      listing_tags {
        tag {
          label
          value
        }
      }
      location_country_code
      location_address
      location_city
      location_state
      location_zip_code
      bidding_ends
      bids_aggregate {
        aggregate {
          sum {
            increment
          }
          count(columns: id)
        }
      }
    }
  }
`;

export const GET_BIDDINGS_LIVE = gql`
  subscription MySubscription(
    $orderBy: [bids_order_by!]
    $where: bids_bool_exp
  ) {
    bids(order_by: $orderBy, where: $where) {
      is_anonymous
      increment
      user {
        name
        id
      }
    }
  }
`;
export const UPDATE_LISTING = gql`
  mutation Update_listings_by_pk(
    $pkColumns: listings_pk_columns_input!
    $set: listings_set_input
  ) {
    update_listings_by_pk(pk_columns: $pkColumns, _set: $set) {
      bidding_ends
    }
  }
`;

export const CREATE_BID = gql`
  mutation Insert_bids_one($object: bids_insert_input!) {
    insert_bids_one(object: $object) {
      id
    }
  }
`;
