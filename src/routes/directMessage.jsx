import React from 'react';
import PropTypes from 'prop-types';
import { useQuery, useMutation } from '@apollo/react-hooks';
import { Redirect } from 'react-router-dom';
import { ALL_TEAMS } from '../gql/team';
import { SEND_DIRECT_MESSAGE } from '../gql/messages';
import AppLayout from '../components/styledComponents/appLayout';
import Header from '../components/header';
import SendMessage from '../components/sendMessage';
import SideBar from '../containers/sideBar';
import DirectMessageList from '../components/directMessageList';

const DirectMessage = ({ match: { params: { teamId, userId } } }) => {
    const { loading, error, data } = useQuery(ALL_TEAMS, {
        fetchPolicy: 'network-only',
    });

    const [createMessage] = useMutation(SEND_DIRECT_MESSAGE, {
        onCompleted: (resp) => {
            const { success, errors } = resp.createDirectMessage;
            if (!success) {
                console.log(errors);
            }
        },
        onError: (err) => {
            console.log('GraphQl failed');
            console.log(err);
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
    const userIdInt = parseInt(userId, 10);

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
            <Header channelName="TEST DIRECT MESSAGES" />
            <DirectMessageList teamId={teamIdInt} userId={userIdInt} />
            <SendMessage
                onSubmit={async (text) => {
                    await createMessage({ variables: { teamId: team.id, receiverId: userIdInt, message: text } });
                }}
                header="TEST DIRECT MESSAGES"
            />
        </AppLayout>
    );
};

DirectMessage.propTypes = {
    // eslint-disable-next-line react/forbid-prop-types
    match: PropTypes.object,
};

DirectMessage.defaultProps = {
    match: {},
};

export default DirectMessage;
