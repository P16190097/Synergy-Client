import { gql } from 'apollo-boost';

export const getAllUsers = gql`
      {
        allUsers {
          id
        }
      }
    `;

export const REGISTER_USER = gql`
mutation(
  $username: String!, 
  $email: String!, 
  $password: String!
  ) {
    registerUser(
      username: $username, 
      email: $email, 
      password: $password
    )
}
 `;
