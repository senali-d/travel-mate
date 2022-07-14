import { gql } from '@apollo/client'

export const GET_PLACES = gql`
  query MyQuery   {
    getPlaceList {
      id
      title
      description
      points
      photo
      reviewList {
        id
      }
    }
  }
`;

export const GET_PLACE = gql`
  query MyQuery($id: ID!) {
    getPlace(id: $id) {
    id
    title
    photo
    longitude
    latitude
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

export const GET_PLACES_BY_ID = gql`
  query MyQuery($user_id: ID!) {
    getPlaceListById(user_id: $user_id) {
      id
      title
      description
      photo
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
      user_followListUsingUser_id {
        userUsingFollower_id {
          id
        }
      }
      user_followListUsingFollower_id {
        userUsingUser_id {
          id
        }
      }
    }
  }
`;

export const GET_USER_BY_EMAIL = gql`
  query MyQuery($email: String!) {
    getUserByEmail(email: $email) {
      email
      role
      id
      image
    }
  }
`;

export const GET_GUIDES = gql`
  query MyQuery   {
    getGuideList {
      id
      name
      email
      mobile
      image
      location
    }
  }
`;

export const GET_HOTELS = gql`
  query MyQuery   {
    getHotelList {
      id
      name
      description
      points
      photo
      hotel_reviewList {
        id
      }
    }
  }
`;

export const GET_HOTEL = gql`
  query MyQuery($id: ID!) {
    getHotel(id: $id) {
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

export const GET_USERS = gql`
  query MyQuery($id: ID!) {
    getUserExceptMe(id: $id) {
      id
      name
      image
    }
  }
`;

export const GET_FOLLOWERS = gql`
  query MyQuery($id: ID!) {
    getUser_followUsingFollower_id(id: $id) {
      id
      userUsingUser_id {
        id
        name
        image
      }
    }
  }
`;

export const GET_FOLLOWING = gql`
  query MyQuery($id: ID!) {
    getUser_followUsingUser_id(id: $id) {
      id
      userUsingFollower_id {
        name
        id
        image
      }
    }
  }
`;