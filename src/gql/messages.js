import gql from 'graphql-tag';

export const GET_MESSAGES = gql`
    query($channelId: Int!) {
        getMessages(channelId: $channelId) {
            success
            messages {
                id
                text
                user {
                    username
                }
                createdAt
            }
            errors {
                path
                message
            }
        }
    }
 `;

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
