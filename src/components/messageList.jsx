import React from 'react';
import PropTypes from 'prop-types';
import { useQuery } from '@apollo/react-hooks';
import { GET_MESSAGES } from '../gql/messages';
import Messages from './messages';

const MessageList = ({ channelId }) => {
    const { loading, error, data } = useQuery(GET_MESSAGES, {
        variables: {
            channelId,
        },
    });

    if (loading || error) {
        return (<p>An error has occured</p>);
    }

    const { getMessages } = data;

    return (
        <Messages>
            {JSON.stringify(getMessages)}
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
