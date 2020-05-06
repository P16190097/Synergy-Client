import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Channels from '../components/channels';
import Teams from '../components/teams';
import AddChannelModal from '../components/modals/addChannelModal';
import AddPeopleModal from '../components/modals/addPeopleModal';
import DirectMessageModal from '../components/modals/directMessageModal';

const SideBar = ({ allTeams, currentTeam, username, userId }) => {
    const [openDirectMessageModal, setDirectMessageModal] = useState(false);
    const [openChannelModal, setOpenChannelModal] = useState(false);
    const [openInviteUserModal, setInviteUserModal] = useState(false);

    const toggleDirectMessageModal = (e) => {
        if (e) {
            e.preventDefault();
        }
        setDirectMessageModal(!openDirectMessageModal);
    };

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
            />
            <Channels
                key="channel-sidebar"
                teamName={currentTeam.name}
                teamId={currentTeam.id}
                username={username}
                userId={userId}
                channels={currentTeam.channels}
                isOwner={currentTeam.admin}
                users={currentTeam.directMessageMembers}
                onAddChannelClick={(e) => toggleChannelModal(e)}
                onInvitePeopleClick={(e) => toggleUserModal(e)}
                onDirectMessageClick={(e) => toggleDirectMessageModal(e)}
            />
            {openDirectMessageModal && (
                <DirectMessageModal
                    userId={userId}
                    open={openDirectMessageModal}
                    onClose={(e) => toggleDirectMessageModal(e)}
                    key="sidebar-direct-message-modal"
                    currentTeamId={currentTeam.id}
                />
            )}
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
    userId: PropTypes.number,
};

SideBar.defaultProps = {
    currentTeam: {},
    allTeams: [{}],
    username: '',
    userId: null,
};

export default SideBar;
