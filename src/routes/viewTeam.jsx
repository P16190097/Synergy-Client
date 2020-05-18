import React from 'react';
import PropTypes from 'prop-types';
import { useQuery, useMutation } from '@apollo/react-hooks';
import { Redirect, useHistory } from 'react-router-dom';
import { Dimmer, Loader, Header as SemanticHeader } from 'semantic-ui-react';
import { GET_USER } from '../gql/user';
import { SEND_MESSAGE } from '../gql/messages';
import AppLayout from '../components/styledComponents/appLayout';
import Navbar from '../components/navbar';
import Header from '../components/header';
import SendMessage from '../components/sendMessage';
import SideBar from '../containers/sideBar';
import MesssageList from '../components/messageList';

const ViewTeam = ({ match: { params: { teamId, channelId } } }) => {
    const history = useHistory();

    const navigateToError = () => {
        history.push('/error');
    };

    const { loading, error, data } = useQuery(GET_USER, {
        fetchPolicy: 'network-only',
    });

    const [createMessage] = useMutation(SEND_MESSAGE, {
        onCompleted: (resp) => {
            const { success, errors } = resp.createMessage;
            if (!success) {
                console.log(errors);
            }
        },
        onError: (err) => {
            console.log('GraphQl failed');
            console.log(err);
            navigateToError();
        },
    });

    if (loading) {
        return (
            <Dimmer active>
                <Loader />
            </Dimmer>
        );
    }

    if (error) {
        return (
            <Redirect to={{
                pathname: (error.message.includes('Not Authenticated') ? '/login' : '/error'),
            }}
            />
        );
    }

    const { teams, username, id } = data.getUser;

    //const teams = [...allTeams, ...inviteTeams];

    if (!teams.length) {
        return (<Redirect to="/createteam" />);
    }
    const teamIdInt = parseInt(teamId, 10);

    const currentTeamId = teamIdInt || 0;
    const teamList = teams;
    const teamIndex = currentTeamId ? teamList.findIndex(x => x.id === parseInt(currentTeamId, 10)) : 0;
    const team = teamIndex >= 0 ? teamList[teamIndex] : teamList[0];

    const channelIdInt = parseInt(channelId, 10);
    const currentChannelId = channelIdInt ? team.channels.findIndex(x => x.id === channelIdInt) : 0;
    const channel = team.channels[currentChannelId];

    return (
        <AppLayout>
            <Navbar />
            <SideBar
                userId={id}
                username={username}
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
                        channelName={`# ${channel.name}`}
                    />
                    <MesssageList
                        channelId={channel.id}
                    />
                    <SendMessage
                        onSubmit={async (text) => {
                            await createMessage({ variables: { message: text, channelId: parseInt(channel.id, 10) } });
                        }}
                        header={channel.name}
                    />
                </>
            ) : (
                    <SemanticHeader color="orange" as="h1" size="large" textAlign="center">
                        Please select a channel to view
                    </SemanticHeader>
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
