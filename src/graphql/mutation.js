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

export const CREATE_HOTEL_REVIEW = gql`
  mutation MyMutation (
    $hotel_id: ID!
    $review: String!
    $stars: Int!
    $user_id: ID!
  ) {
  insertHotel_review(
    hotel_id: $hotel_id,
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

export const UPDATE_HOTEL_POINT = gql`
  mutation MyMutation (
    $id: ID!,
    $points: Float!
  ) {
    updateHotelPoint(
      id: $id,
      points: $points
    ) {
      id
      address
      bedrooms
      beds
      description
      fee
      guests
      latitude
      longitude
      name
      photo
      points
      hotel_reviewList {
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

export const UNFOLLOW = gql`
  mutation MyMutation (
    $id: ID!,
  ) {
    deleteUser_follow(
      id: $id,
    ) {
      id
      userUsingFollower_id {
        id
        name
      }
    }
  }
`;

export const CREATE_CONTACT = gql`
  mutation MyMutation (
    $email: String!
    $message: String!
  ) {
    insertContacts(
      email: $email
      message: $message
    ) {
      id
      email
      message
    }
  }
`;

export const FOLLOW = gql`
  mutation MyMutation(
    $follower_id: ID!,
    $user_id: ID!,
  ) {
    insertUser_follow(follower_id: $follower_id, user_id: $user_id) {
      follower_id
      id
    }
  }
`;