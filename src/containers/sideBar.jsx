import React, { useState } from 'react';
import PropTypes from 'prop-types';
import decode from 'jwt-decode';
import { useQuery } from '@apollo/react-hooks';
import Channels from '../components/channels';
import Teams from '../components/teams';
import AddChannelModal from '../components/modals/addChannelModal';
import { ALL_TEAMS } from '../gql/team';

const SideBar = ({ currentTeamId }) => {
    const [openChannelModal, setOpenChannelModal] = useState(false);
    const { loading, error, data } = useQuery(ALL_TEAMS);

    if (loading || error) {
        return null;
    }

    const teamList = data.allTeams;

    const teamIndex = currentTeamId ? teamList.findIndex(x => x.id === parseInt(currentTeamId, 10)) : 0;

    const team = teamIndex >= 0 ? teamList[teamIndex] : teamList[0];

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
                teams={teamList.map((t) => ({
                    id: t.id,
                    letter: t.name.charAt(0).toUpperCase(),
                    active: t.id === team.id,
                }))}
            >
                Teams
            </Teams>
            <Channels
                key="channel-sidebar"
                teamName={team.name}
                teamId={team.id}
                username={username}
                channels={team.channels}
                users={[{ id: 1, name: 'slack-bot' }, { id: 2, name: 'user1' }]}
                onAddChannelClick={() => setOpenChannelModal(true)}
            >
                Channels
            </Channels>
            <AddChannelModal
                open={openChannelModal}
                onClose={() => setOpenChannelModal(false)}
                key="sidebar-add-channel-modal"
                currentTeamId={team.id}
            />
        </>
    );
};

SideBar.propTypes = {
    currentTeamId: PropTypes.number,
};

SideBar.defaultProps = {
    currentTeamId: 0,
};

export default SideBar;
