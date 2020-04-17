import gql from 'graphql-tag';

export const GET_USERS_TEAMS = gql`
    query {
        getUserTeams {
            id
            name
            description
            admin
        }
    }
`;

export const GET_TEAM_FOR_EDIT = gql`
    query($teamId: Int!) {
        getTeam(teamId: $teamId) {
            id
            name
            description
        }
    }
`;

export const CREATE_TEAM = gql`
    mutation($teamName: String!, $description: String!) {
        createTeam(name: $teamName, description: $description) {
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
    mutation($teamId: Int!, $teamName: String!, $description: String!) {
        editTeam(teamId: $teamId, teamName: $teamName, description: $description) {
            success
            errors {
                path
                message
            }
        }
    }
 `;

export const DELETE_TEAM = gql`
    mutation($teamId: Int!) {
        deleteTeam(teamId: $teamId) {
            success
            errors {
                path
                message
            }
        }
    }
`;

export const LEAVE_TEAM = gql`
    mutation($teamId: Int!) {
        leaveTeam(teamId: $teamId) {
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
