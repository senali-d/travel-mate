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

export const UPDATE_PLACE = gql`
  mutation MyMutation (
    $id: ID!,
    $points: Float!
  ) {
    updatePlace(
      id: $id,
      points: $points
    ) {
      title
      photo
      location
      description
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