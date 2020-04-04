import gql from 'graphql-tag';

export const SEND_MESSAGE = gql`
    mutation($message: String!, $channelId: Int!) {
        createMessage(channelId: $channelId, text: $message) {
            success
            errors {
                path
                message
            }
        }
    }
 `;
