import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { useQuery } from '@apollo/react-hooks';
import { Comment as Message, Header, Icon, Loader } from 'semantic-ui-react';
import moment from 'moment';
import { GET_DIRECT_MESSAGES, NEW_DIRECT_MESSAGE_SUBSCRIPTION } from '../gql/messages';
import Messages from './styledComponents/messages';

const DirectMessageList = ({ teamId, userId, fetching }) => {
    const { subscribeToMore, loading, error, data } = useQuery(GET_DIRECT_MESSAGES, {
        variables: {
            teamId,
            userId,
        },
        fetchPolicy: 'network-only',
    });

    useEffect(() => {
        const unSubscribe = subscribeToMore({
            document: NEW_DIRECT_MESSAGE_SUBSCRIPTION,
            variables: { teamId, userId },
            updateQuery: (prev, { subscriptionData }) => {
                if (!subscriptionData) {
                    return prev;
                }

                const newMessage = subscriptionData.data.newDirectMessage;

                return {
                    getDirectMessages: [...prev.getDirectMessages, newMessage],
                };
            },
            //onError: err => console.error(err),
        });
        // returns unSubscribe cleanup function, runs on ComponentDidUnmount
        return unSubscribe;
    }, [subscribeToMore, teamId, userId]);

    if (loading || fetching) {
        return (
            <Loader />
        );
    }
    if (error) {
        return (<p>An error has occured</p>);
    }

    const { getDirectMessages: messages } = data;

    return (
        <Messages>
            <Message.Group>
                {messages.map((message) => (
                    <Message key={`directMessage-${message.id}`}>
                        <Message.Content>
                            <Message.Author className="message-name" as="a">{message.sender.username}</Message.Author>
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

DirectMessageList.propTypes = {
    teamId: PropTypes.number,
    userId: PropTypes.number,
    fetching: PropTypes.bool,
};

DirectMessageList.defaultProps = {
    teamId: null,
    userId: null,
    fetching: false,
};

export default DirectMessageList;
