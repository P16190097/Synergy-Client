import React, { useState } from 'react';
import PropTypes from 'prop-types';
import decode from 'jwt-decode';
import Channels from '../components/channels';
import Teams from '../components/teams';
import AddChannelModal from '../components/modals/addChannelModal';
import AddPeopleModal from '../components/modals/addPeopleModal';

const SideBar = ({ allTeams, currentTeam }) => {
    const [openChannelModal, setOpenChannelModal] = useState(false);
    const [openInviteUserModal, setInviteUserModal] = useState(false);

    let username = '';
    try {
        const token = localStorage.getItem('token');
        const { user } = decode(token);
        username = user.username;
    } catch (err) {
        console.log(err);
    }

    return (
        <>
            <Teams
                key="team-sidebar"
                teams={allTeams}
            >
                Teams
            </Teams>
            <Channels
                key="channel-sidebar"
                teamName={currentTeam.name}
                teamId={currentTeam.id}
                username={username}
                channels={currentTeam.channels}
                users={[{ id: 1, name: 'slack-bot' }, { id: 2, name: 'user1' }]}
                onAddChannelClick={() => setOpenChannelModal(true)}
                onInvitePeopleClick={() => setInviteUserModal(true)}
            >
                Channels
            </Channels>
            <AddChannelModal
                open={openChannelModal}
                onClose={() => setOpenChannelModal(false)}
                key="sidebar-add-channel-modal"
                currentTeamId={currentTeam.id}
            />
            <AddPeopleModal
                open={openInviteUserModal}
                onClose={() => setInviteUserModal(false)}
                key="sidebar-add-user-modal"
                currentTeamId={currentTeam.id}
            />
        </>
    );
};

SideBar.propTypes = {
    // eslint-disable-next-line react/forbid-prop-types
    currentTeam: PropTypes.object,
    allTeams: PropTypes.arrayOf(PropTypes.object),

};

SideBar.defaultProps = {
    currentTeam: {},
    allTeams: [{}],
};

export default SideBar;
