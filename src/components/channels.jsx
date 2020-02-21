import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import ChannelListItem from './listItems/channelListItem';
import UserListItem from './listItems/userListItem';

const ChannelWrapper = styled.div`
    grid-column: 2;
    grid-row: 1 / 4;
    background-color: #252526;
    color: #9e9e9e;
`;

const NameWrapper = styled.div`
    color: #ff9900;
`;

const Channels = ({ teamName, username, channels, users }) => {
    return (
        <ChannelWrapper>
            <NameWrapper>
                {teamName}
                {username}
            </NameWrapper>
            <div>
                <ul>
                    <li>Channels</li>
                    {channels.map(ChannelListItem)}
                </ul>
            </div>
            <div>
                <ul>
                    <li>Users</li>
                    {users.map(UserListItem)}
                </ul>
            </div>
        </ChannelWrapper>
    );
};

Channels.propTypes = {
    teamName: PropTypes.string,
    username: PropTypes.string,
    channels: PropTypes.arrayOf(PropTypes.object),
    users: PropTypes.arrayOf(PropTypes.object),
};

Channels.defaultProps = {
    teamName: '',
    username: '',
    channels: [],
    users: [],
};

export default Channels;
