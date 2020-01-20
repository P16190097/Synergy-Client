import { gql } from 'apollo-boost';

export const getAllUsers = gql`
      {
        allUsers {
          id
        }
      }
    `;

export const REGISTER_USER = gql`
mutation($username: String!, $email: String!, $password: String!) {
    registerUser(username: $username, email: $email, password: $password) {
      ok
      user {
        id
        username
        email
      }
      errors {
        path
        message
      }
    }
}
 `;

export const AUTHENTICATE_USER = gql`
mutation($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      ok
      token
      refreshToken
      errors {
        path
        message
      }
    }
}
 `;
