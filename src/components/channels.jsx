import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { Icon } from 'semantic-ui-react';
import ChannelListItem from './listItems/channelListItem';
import UserListItem from './listItems/userListItem';

const ChannelWrapper = styled.div`
    grid-column: 2;
    grid-row: 1 / 4;
    background-color: #252526;
    color: #9e9e9e;
`;

const TeamNameHeader = styled.h1`
    color: #ff9900;
    font-size: 20px;
`;

const SideBarList = styled.ul`
    width: 100%;
    list-style: none;
    padding-left: 0px;
`;

const paddingLeft = 'padding-left: 10px;';

const SideBarListHeader = styled.li`${paddingLeft};`;

const PushLeft = styled.div`${paddingLeft};`;

const Channels = ({ teamName, username, channels, isOwner, users, onAddChannelClick, teamId, onInvitePeopleClick }) => {
    return (
        <ChannelWrapper>
            <PushLeft>
                <TeamNameHeader>
                    {teamName}
                </TeamNameHeader>
                {username}
            </PushLeft>
            <div>
                <SideBarList>
                    <SideBarListHeader>Channels {isOwner && <Icon name="add circle" onClick={onAddChannelClick} />}</SideBarListHeader>
                    {channels.map((c) => ChannelListItem(c, teamId))}
                </SideBarList>
            </div>
            <div>
                <SideBarList>
                    <SideBarListHeader>Users</SideBarListHeader>
                    {users.map(UserListItem)}
                </SideBarList>
            </div>
            {isOwner && (
                <div>
                    <a href="#invite-user" onClick={onInvitePeopleClick}>
                        + Invite People
                    </a>
                </div>
            )}

        </ChannelWrapper>
    );
};

Channels.propTypes = {
    teamName: PropTypes.string,
    username: PropTypes.string,
    channels: PropTypes.arrayOf(PropTypes.object),
    users: PropTypes.arrayOf(PropTypes.object),
    onAddChannelClick: PropTypes.func,
    teamId: PropTypes.number,
    onInvitePeopleClick: PropTypes.func,
    // eslint-disable-next-line react/forbid-prop-types
    isOwner: PropTypes.bool,
};

Channels.defaultProps = {
    teamName: '',
    username: '',
    channels: [],
    users: [],
    onAddChannelClick: () => { },
    teamId: null,
    onInvitePeopleClick: () => { },
    isOwner: false,
};

export default Channels;
