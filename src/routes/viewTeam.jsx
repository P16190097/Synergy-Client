import React from 'react';
import PropTypes from 'prop-types';
import { useQuery } from '@apollo/react-hooks';
import { Redirect } from 'react-router-dom';
import { ALL_TEAMS } from '../gql/team';
import AppLayout from '../components/appLayout';
import Header from '../components/header';
import Messages from '../components/messages';
import SendMessage from '../components/sendMessage';
import SideBar from '../containers/sideBar';

const ViewTeam = ({ match: { params: { teamId, channelId } } }) => {
    const { loading, error, data } = useQuery(ALL_TEAMS);

    if (loading || error) {
        return null;
    }

    if (!data.allTeams.length) {
        return (<Redirect to="/createteam" />);
    }

    const teamIdInt = parseInt(teamId, 10);

    const currentTeamId = teamIdInt || 0;
    const teamList = data.allTeams;
    const teamIndex = currentTeamId ? teamList.findIndex(x => x.id === parseInt(currentTeamId, 10)) : 0;
    const team = teamIndex >= 0 ? teamList[teamIndex] : teamList[0];

    const channelIdInt = parseInt(channelId, 10);
    const currentChannelId = channelIdInt ? team.channels.findIndex(x => x.id === channelIdInt) : 0;
    const channel = team.channels[currentChannelId];

    return (
        <AppLayout>
            <SideBar
                currentTeamId={currentTeamId}
                allTeams={teamList.map((t) => ({
                    id: t.id,
                    letter: t.name.charAt(0).toUpperCase(),
                    active: t.id === team.id,
                }))}
                currentTeam={team}
            />
            {channel ? (
                <>
                    <Header
                        channelName={channel.name}
                    >
                        Header
                    </Header>
                    <Messages>
                        <ul className="message-list">
                            <li />
                            <li />
                        </ul>
                    </Messages>
                    <SendMessage
                        channelName={channel.name}
                    />
                </>
            ) : (
                    <h1>Please select a channel to view</h1>
                )}
        </AppLayout>
    );
};

ViewTeam.propTypes = {
    // eslint-disable-next-line react/forbid-prop-types
    match: PropTypes.object,
};

ViewTeam.defaultProps = {
    match: {},
};

export default ViewTeam;
