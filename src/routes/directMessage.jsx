import React from 'react';
import PropTypes from 'prop-types';
import { useQuery, useMutation } from '@apollo/react-hooks';
import { Redirect } from 'react-router-dom';
import { ALL_TEAMS } from '../gql/team';
import { SEND_MESSAGE } from '../gql/messages';
import AppLayout from '../components/appLayout';
import Header from '../components/header';
import SendMessage from '../components/sendMessage';
import SideBar from '../containers/sideBar';
import MesssageList from '../components/messageList';

const ViewTeam = ({ match: { params: { teamId, userId } } }) => {
    const { loading, error, data } = useQuery(ALL_TEAMS, {
        fetchPolicy: 'network-only',
    });

    const [createMessage] = useMutation(SEND_MESSAGE, {
        onCompleted: (resp) => {
            const { success, errors } = resp.createMessage;
            if (!success) {
                console.log(errors);
            }
        },
        onError: (error) => {
            console.log('GraphQl failed');
            console.log(error);
        },
    });

    if (loading) {
        return (<p>Loading...</p>);
    }

    if (error) {
        console.log(error);
        return (<p>An error has occured</p>);
    }

    const { teams, username } = data.getUser;

    //const teams = [...allTeams, ...inviteTeams];

    if (!teams.length) {
        return (<Redirect to="/createteam" />);
    }
    const teamIdInt = parseInt(teamId, 10);

    const currentTeamId = teamIdInt || 0;
    const teamList = teams;
    const teamIndex = currentTeamId ? teamList.findIndex(x => x.id === parseInt(currentTeamId, 10)) : 0;
    const team = teamIndex >= 0 ? teamList[teamIndex] : teamList[0];

    return (
        <AppLayout>
            <SideBar
                username={username}
                allTeams={teamList.map((t) => ({
                    id: t.id,
                    letter: t.name.charAt(0).toUpperCase(),
                    active: t.id === team.id,
                }))}
                currentTeam={team}
            />
            {/* <Header channelName={channel.name}>
                Header
            </Header>
            <MesssageList channelId={channel.id} /> */}
            <SendMessage
                onSubmit={async (text) => {
                    await createMessage({ variables: { message: text, userId: parseInt(user.id, 10) } });
                }}
                header={user.username}
            />
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
