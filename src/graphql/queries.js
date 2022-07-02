import { gql } from '@apollo/client'

export const GET_PLACES = gql`
  query MyQuery   {
    getPlaceList {
      id
      title
      description
      points
      photo
    }
  }
`;

export const GET_PLACE = gql`
  query MyQuery($id: ID!) {
    getPlace(id: $id) {
    title
    points
    photo
    location
    id
    description
    reviewList {
      review
      user {
        id
        name
      }
    }
  }
  }
`;

export const GET_USER_BY_ID = gql`
  query MyQuery($id: ID!) {
    getUser(id: $id) {
      id
      email
      name
      image
      mobile
      country
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
