import gql from 'graphql-tag';

export const CREATE_CHANNEL = gql`
    mutation($channelName: String!, $teamId: Int!) {
        createChannel(name: $channelName, teamId: $teamId) {
            success
            channel {
                id
                name
            }
            errors {
                path
                message
            }
        }
    }
 `;

export const DELETE_CHANNEL = gql`
    mutation($channelId: Int!, $teamId: Int!) {
        deleteChannel(channelId: $channelId, teamId: $teamId) {
            success
            errors {
                path
                message
            }
        }
    }
`;
