import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Channels from '../components/channels';
import Teams from '../components/teams';
import AddChannelModal from '../components/modals/addChannelModal';
import AddPeopleModal from '../components/modals/addPeopleModal';

const SideBar = ({ allTeams, currentTeam, username }) => {
    const [openChannelModal, setOpenChannelModal] = useState(false);
    const [openInviteUserModal, setInviteUserModal] = useState(false);

    const toggleChannelModal = (e) => {
        if (e) {
            e.preventDefault();
        }
        setOpenChannelModal(!openChannelModal);
    };

    const toggleUserModal = (e) => {
        if (e) {
            e.preventDefault();
        }
        setInviteUserModal(!openInviteUserModal);
    };

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
                isOwner={currentTeam.admin}
                users={[{ id: 1, name: 'slack-bot' }, { id: 2, name: 'user1' }]}
                onAddChannelClick={(e) => toggleChannelModal(e)}
                onInvitePeopleClick={(e) => toggleUserModal(e)}
            >
                Channels
            </Channels>
            <AddChannelModal
                open={openChannelModal}
                onClose={(e) => toggleChannelModal(e)}
                key="sidebar-add-channel-modal"
                currentTeamId={currentTeam.id}
            />
            <AddPeopleModal
                open={openInviteUserModal}
                onClose={(e) => toggleUserModal(e)}
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
    username: PropTypes.string,

};

SideBar.defaultProps = {
    currentTeam: {},
    allTeams: [{}],
    username: '',
};

export default SideBar;
