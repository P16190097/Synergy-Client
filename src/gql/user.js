import { gql } from 'apollo-boost';

export const getAllUsers = gql`
      {
        allUsers {
          id
        }
      }
    `;
