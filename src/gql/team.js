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

export const ALL_TEAMS = gql`
    query {
        allTeams {
            id
            owner
            name
            channels {
                id
                name
            }
        }
        inviteTeams {
            id
            owner
            name
            channels {
                id
                name
            }
        }
    }
`;

export const ADD_USER_TO_TEAM = gql`
mutation($email: String!, $teamId: Int!) {
    addTeamMember(email: $email, teamId: $teamId) {
        success
        errors {
            path
            message
        }
    }
}
`;
