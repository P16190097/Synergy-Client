import gql from 'graphql-tag';

export const CREATE_CHANNEL = gql`
    mutation($channelName: String!, $teamId: Int!) {
        createChannel(name: $channelName, teamId: $teamId) {
            success
            channel {
                id
            }
            errors {
                path
                message
            }
        }
    }
 `;
