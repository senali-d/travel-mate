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