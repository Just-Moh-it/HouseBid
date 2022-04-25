import { gql } from "@apollo/client";

export const PROFILE_QUERY = gql`
  query Users_by_pk($usersByPkId: String!) {
    users_by_pk(id: $usersByPkId) {
      id
      name
      created_at
      updated_at
      listings_aggregate {
        aggregate {
          count
        }
      }
    }
  }
`;
