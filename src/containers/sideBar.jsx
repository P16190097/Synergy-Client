import React from 'react';
import PropTypes from 'prop-types';
import decode from 'jwt-decode';
import { useQuery } from '@apollo/react-hooks';
import Channels from '../components/channels';
import Teams from '../components/teams';
import { ALL_TEAMS } from '../gql/team';

const SideBar = ({ currentTeamId }) => {
    const { loading, error, data } = useQuery(ALL_TEAMS);

    if (loading || error) {
        return null;
    }

    const teamList = data.allTeams;

    const teamIndex = teamList.findIndex(x => x.id === currentTeamId);

    const team = teamList[teamIndex];

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
                }))}
            >
                Teams
            </Teams>
            <Channels
                key="channel-sidebar"
                teamName={team.name}
                username={username}
                channels={team.channels}
                users={[{ id: 1, name: 'slack-bot' }, { id: 2, name: 'user1' }]}
            >
                Channels
            </Channels>
        </>
    );
};

SideBar.propTypes = {
    currentTeamId: PropTypes.number,
};

SideBar.defaultProps = {
    currentTeamId: null,
};

export default SideBar;
