import gql from 'graphql-tag';

export const CREATE_TEAM = gql`
    mutation($teamName: String!) {
        createTeam(name: $teamName) {
            success
            errors {
                path
                message
            }
        }
    }
 `;
