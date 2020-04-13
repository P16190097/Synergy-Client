import gql from 'graphql-tag';

export const CREATE_TEAM = gql`
    mutation($teamName: String!) {
        createTeam(name: $teamName) {
            success
            team {
                id
            }
            errors {
                path
                message
            }
        }
    }
 `;

export const ADD_USER_TO_TEAM = gql`
mutation($email: String!, $teamId: Int!) {
    addTeamMember(email: $email, teamId: $teamId) {
        success
        user {
            id
            username
        }
        errors {
            path
            message
        }
    }
}
`;
