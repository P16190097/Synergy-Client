import gql from 'graphql-tag';

export const GET_MESSAGES = gql`
    query($channelId: Int!) {
        getMessages(channelId: $channelId) {
            id
            text
            user {
                username
            }
            createdAt
        }
    }
 `;

export const NEW_CHANNEL_MESSAGE_SUBSCRIPTION = gql`
    subscription($channelId: Int!) {
        newChannelMessage(channelId: $channelId) {
            id
            text
            user {
                username
            }
            createdAt
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

export const GET_DIRECT_MESSAGES = gql`
    query($teamId: Int!, $userId: Int!) {
        getDirectMessages(teamId: $teamId, receiverId: $userId) {
            id
            text
            createdAt
            sender {
                username
            }
        }
    }
`;

export const SEND_DIRECT_MESSAGE = gql`
    mutation($teamId: Int!, $receiverId: Int!, $message: String!) {
        createDirectMessage(teamId: $teamId, receiverId: $receiverId, text: $message) {
            success
            errors {
                path
                message
            }
        }
    }
`;
