import gql from 'graphql-tag';

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
      success
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
    authenticateUser(email: $email, password: $password) {
      success
      token
      refreshToken
      errors {
        path
        message
      }
    }
}
 `;
