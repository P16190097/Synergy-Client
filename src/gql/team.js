import gql from 'graphql-tag';

export const GET_USERS_TEAMS = gql`
    query {
        getUserTeams {
            id
            name
            admin
        }
    }
`;

export const GET_TEAM_FOR_EDIT = gql`
    query($teamId: Int!) {
        getTeam(teamId: $teamId) {
            id
            name
        }
    }
`;

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

export const EDIT_TEAM = gql`
    mutation($teamId: Int!, $teamName: String!) {
        editTeam(teamId: $teamId, teamName: $teamName) {
            success
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
