import { gql } from '@apollo/client'

export const CREATE_USER = gql`
  mutation MyMutation (
    $email: String!
    $role: String!
  ) {
    insertUser(
      email: $email
      role: $role
    ) {
      email
      id
      role
      image
    }
  }
`;

export const UPDATE_USER = gql`
  mutation MyMutation (
    $id: ID!
    $name: String
    $image: String
    $mobile: String
    $country: String
  ) {
    updateUser(
      id: $id,
      name: $name
      image: $image
      mobile: $mobile
      country: $country
    ) {
      id
      name
      email
      image
      mobile
      country
    }
  }
`;

export const CREATE_REVIEW = gql`
  mutation MyMutation (
    $place_id: ID!
    $review: String!
    $stars: Int!
    $user_id: ID!
  ) {
  insertReview(
    place_id: $place_id,
    review: $review,
    stars: $stars,
    user_id: $user_id,
  ) {
      id
      created_at
      review
      stars
      user {
        name
        image
        country
        created_at
      }
    }
  }
`;

export const UPDATE_PLACE_POINT = gql`
  mutation MyMutation (
    $id: ID!,
    $points: Float!
  ) {
    updatePlacePoint(
      id: $id,
      points: $points
    ) {
      title
      description
      photo
      longitude
      latitude
      points
      reviewList {
        id
        created_at
        review
        stars
        user {
          name
          image
          country
          created_at
        }
      }
    }
  }
`;

export const UPDATE_PLACE = gql`
  mutation MyMutation (
    $id: ID!,
    $title: String!
    $description: String!
    $photo: String!
    $latitude: Float!
    $longitude: Float!
  ) {
    updatePlace(
      id: $id,
      title: $title
      description: $description
      photo: $photo
      latitude: $latitude
      longitude: $longitude
    ) {
      id
      title
      description
      photo
      latitude
      longitude
    }
  }
`;

export const CREATE_PLACE = gql`
  mutation MyMutation (
    $title: String!
    $description: String!
    $photo: String!
    $latitude: Float!
    $longitude: Float!
    $points: Float!
    $user_id: ID!
  ) {
    insertPlace(
      title: $title
      description: $description
      photo: $photo
      latitude: $latitude
      longitude: $longitude
      points: $points
      user_id: $user_id
    ) {
      id
      title
      description
      photo
      latitude
      longitude
    }
  }
`;