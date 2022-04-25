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
    }
  }
`;

export const GET_SINGLE_LISTING = gql`
  query Listings_by_pk($listingsByPkId: bigint!) {
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
      }
      listing_features {
        feature {
          title
          value
        }
      }
    }
  }
`;
