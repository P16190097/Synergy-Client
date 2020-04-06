import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { useQuery } from '@apollo/react-hooks';
import { Comment, Header, Icon } from 'semantic-ui-react';
import moment from 'moment';
import { GET_MESSAGES, NEW_CHANNEL_MESSAGE_SUBSCRIPTION } from '../gql/messages';
import Messages from './messages';

const MessageList = ({ channelId }) => {
    const { subscribeToMore, loading, error, data } = useQuery(GET_MESSAGES, {
        variables: {
            channelId,
        },
        options: {
            fetchPolicy: 'network-only',
        },
    });

    useEffect(() => {
        const unSubscribe = subscribeToMore({
            document: NEW_CHANNEL_MESSAGE_SUBSCRIPTION,
            variables: { channelId },
            updateQuery: (prev, { subscriptionData }) => {
                if (!subscriptionData) {
                    return prev;
                }
                const newMessage = subscriptionData.data.newChannelMessage;
                return {
                    getMessages: [...prev.getMessages, newMessage],
                };
            },
            //onError: err => console.error(err),
        });
        return unSubscribe;
    }, [subscribeToMore, channelId]);

    if (loading) {
        return (<p>Loading...</p>);
    }
    if (error) {
        return (<p>An error has occured</p>);
    }

    const { getMessages } = data;

    return (
        <Messages>
            <Comment.Group>
                {getMessages.map((message) => (
                    <Comment key={`message-${message.id}`}>
                        <Comment.Content>
                            <Comment.Author className="message-name" as="a">{message.user.username}</Comment.Author>
                            <Comment.Metadata className="message-time">
                                <div>{moment.unix(message.createdAt / 1000).format('DD-MM-YYYY hh:mm:ss A')}</div>
                            </Comment.Metadata>
                            <Comment.Text className="message-text">{message.text}</Comment.Text>
                        </Comment.Content>
                    </Comment>
                ))}
            </Comment.Group>
            <Header as="h2" icon textAlign="center">
                <Icon name="users" circular className="orange" />
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
