import { gql } from '@apollo/client'

export const GET_PLACES = gql`
  query MyQuery   {
    getPlacesList {
      id
      title
      description
      points
      photo
    }
  }
`;

export const GET_USER_BY_EMAIL = gql`
  query MyQuery($email: String!) {
    getUserByEmail(email: $email) {
      email
      role
      id
    }
  }
`;
