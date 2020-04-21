import gql from 'graphql-tag';

// export const ALL_USERS = gql`
//   query {
//     allUsers {
//       id
//       email
//     }
//   }
// `;

export const GET_USER = gql`
    query {
        getUser {
            id
            username
            teams {
                id
                name
                admin
                directMessageMembers {
                    id
                    username
                }
                channels {
                    id
                    name
                }
            }
        }
    }
`;

export const GET_SINGLE_USER = gql`
    query($userId: Int!) {
        getSingleUser(userId: $userId) {
            id
            username
        }
        getUser {
            id
            username
            teams {
                id
                name
                admin
                directMessageMembers {
                    id
                    username
                }
                channels {
                    id
                    name
                }
            }
        }
    }
`;


export const GET_TEAM_USERS = gql`
  query($teamId: Int!) {
    getTeamUsers(teamId: $teamId) {
      id
      username
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
