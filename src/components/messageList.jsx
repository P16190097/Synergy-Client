import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import { useQuery } from '@apollo/react-hooks';
import { Comment as Message, Header, Icon, Loader } from 'semantic-ui-react';
import moment from 'moment';
import { GET_MESSAGES, NEW_CHANNEL_MESSAGE_SUBSCRIPTION } from '../gql/messages';
import Messages from './styledComponents/messages';

const MessageList = ({ channelId }) => {
    const { subscribeToMore, loading, error, data } = useQuery(GET_MESSAGES, {
        variables: {
            channelId,
        },
        fetchPolicy: 'network-only',
    });

    useEffect(() => {
        const unSubscribe = subscribeToMore({
            document: NEW_CHANNEL_MESSAGE_SUBSCRIPTION,
            variables: { channelId },
            updateQuery: (prev, { subscriptionData }) => {
                if (!subscriptionData) {
                    return prev; // prev is cache
                }

                const newMessage = subscriptionData.data.newChannelMessage;

                return {
                    getMessages: [...prev.getMessages, newMessage],
                };
            },
            //onError: err => console.error(err),
        });
        // returns unSubscribe cleanup function, runs on ComponentDidUnmount
        return unSubscribe;
    }, [subscribeToMore, channelId]);

    if (loading) {
        return (
            <Loader />
        );
    }
    if (error) {
        return (
            <Redirect to={{
                pathname: (error.message.includes('Not Authenticated') ? '/login' : '/error'),
            }}
            />
        );
    }

    const { getMessages: messages } = data;

    return (
        <Messages>
            <Message.Group>
                {messages.map((message) => (
                    <Message key={`message-${message.id}`}>
                        <Message.Content>
                            <Message.Author className="message-name" as="a">{message.user.username}</Message.Author>
                            <Message.Metadata className="message-time">
                                <div>{moment.unix(message.createdAt / 1000).format('DD-MM-YYYY hh:mm:ss A')}</div>
                            </Message.Metadata>
                            <Message.Text className="message-text">{message.text}</Message.Text>
                        </Message.Content>
                    </Message>
                ))}
            </Message.Group>
            <Header as="h2" icon textAlign="center" inverted>
                <Icon name="users" circular className="orange" inverted />
                <Header.Content className="white">Start of chat history</Header.Content>
            </Header>
        </Messages>
    );
};

MessageList.propTypes = {
    channelId: PropTypes.number,
};

MessageList.defaultProps = {
    channelId: null,
};

export default MessageList;
