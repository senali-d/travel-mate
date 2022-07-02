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
    }
  }
`;

export const UPDATE_USER = gql`
  mutation MyMutation (
    $id: ID!
    $name: String
    $image: String
  ) {
    updateUser(
      id: $id,
      name: $name
      image: $image
    ) {
      id
      name
      email
      image
    }
  }
`;