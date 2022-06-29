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

