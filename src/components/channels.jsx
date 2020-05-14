import React, { useState } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { Icon, Header, Confirm } from 'semantic-ui-react';
import { useMutation } from '@apollo/react-hooks';
import { DELETE_CHANNEL } from '../gql/channels';
import ChannelListItem from './listItems/channelListItem';
import UserListItem from './listItems/userListItem';

const ChannelWrapper = styled.div`
    grid-column: 2;
    grid-row: 2 / 5;
    background-color: #252526;
    color: #9e9e9e;
    overflow-y: auto;
`;

const SideBarList = styled.ul`
    width: 100%;
    list-style: none;
    padding-left: 0px;
`;

const paddingLeft = 'padding-left: 10px;';

const SideBarListHeader = styled.li`${paddingLeft};`;

const PushLeft = styled.div`${paddingLeft};`;

const Channels = ({ teamName, username, userId, channels, isOwner, users, onAddChannelClick, teamId, onInvitePeopleClick, onDirectMessageClick }) => {
    const [deleteId, setDeleteId] = useState(null);

    const [deleteChannel] = useMutation(DELETE_CHANNEL, {
        onCompleted: (resp) => {
            const { success, errors } = resp.deleteChannel;
            // eslint-disable-next-line no-restricted-globals
            location.reload();
            if (!success) {
                console.log(errors);
            }
        },
        onError: (err) => {
            console.log('GraphQl failed');
            console.log(err);
        },
    });

    return (
        <ChannelWrapper>
            <PushLeft>
                <Header color="orange" as="h1" size="medium">
                    {teamName}
                </Header>
                {username}
            </PushLeft>
            <div>
                <SideBarList>
                    <SideBarListHeader>Channels {isOwner && <Icon name="add circle" onClick={onAddChannelClick} />}</SideBarListHeader>
                    {channels.map((c) => ChannelListItem(c, teamId, isOwner, setDeleteId))}
                </SideBarList>
            </div>
            <div>
                <SideBarList>
                    <SideBarListHeader>Users <Icon name="add circle" onClick={onDirectMessageClick} /></SideBarListHeader>
                    {users.filter((user) => user.id !== userId).map((user) => UserListItem(user, teamId))}
                </SideBarList>
            </div>
            {isOwner && (
                <div>
                    <SideBarList>
                        <a href="#invite-user" onClick={onInvitePeopleClick}>
                            + Invite People
                        </a>
                    </SideBarList>
                    <Confirm
                        open={Boolean(deleteId)}
                        onCancel={() => setDeleteId(null)}
                        onConfirm={() => deleteChannel({
                            variables: {
                                channelId: deleteId,
                                teamId,
                            },
                        })}
                    />
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
    onDirectMessageClick: PropTypes.func,
    // eslint-disable-next-line react/forbid-prop-types
    isOwner: PropTypes.bool,
    userId: PropTypes.number,
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
    onDirectMessageClick: () => { },
    userId: null,
};

export default Channels;
