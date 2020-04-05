import React from 'react';
import PropTypes from 'prop-types';
import { useQuery } from '@apollo/react-hooks';
import { Comment } from 'semantic-ui-react';
import moment from 'moment';
import { GET_MESSAGES } from '../gql/messages';
import Messages from './messages';

const MessageList = ({ channelId }) => {
    const { loading, error, data } = useQuery(GET_MESSAGES, {
        variables: {
            channelId,
        },
    });

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
