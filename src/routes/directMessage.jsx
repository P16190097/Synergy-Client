import React from 'react';
import PropTypes from 'prop-types';
import { useQuery, useMutation } from '@apollo/react-hooks';
import { Redirect, useHistory } from 'react-router-dom';
import { Dimmer, Loader } from 'semantic-ui-react';
import { GET_USER, GET_SINGLE_USER } from '../gql/user';
import { SEND_DIRECT_MESSAGE } from '../gql/messages';
import AppLayout from '../components/styledComponents/appLayout';
import Navbar from '../components/navbar';
import Header from '../components/header';
import SendMessage from '../components/sendMessage';
import SideBar from '../containers/sideBar';
import DirectMessageList from '../components/directMessageList';

const DirectMessage = ({ match: { params: { teamId, userId } } }) => {
    const history = useHistory();

    const navigateToError = () => {
        history.push('/error');
    };

    const { loading: userLoading, data: userData } = useQuery(GET_SINGLE_USER, {
        variables: {
            userId: parseInt(userId, 10),
        },
        fetchPolicy: 'network-only',
    });

    const { loading, error, data } = useQuery(GET_USER, {
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
            navigateToError();
        },
    });

    if (loading || userLoading) {
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
    const { getSingleUser } = userData;

    //const teams = [...allTeams, ...inviteTeams];

    if (!teams.length) {
        return (<Redirect to="/createteam" />);
    }
    const teamIdInt = parseInt(teamId, 10);
    const userIdInt = parseInt(userId, 10);

    const currentTeamId = teamIdInt || 0;
    const teamList = teams;
    const teamIndex = currentTeamId ? teamList.findIndex(x => x.id === currentTeamId) : 0;
    const team = teamIndex >= 0 ? teamList[teamIndex] : teamList[0];

    // if (!team.directMessageMembers.length) {
    //     return (<Redirect to={`/team/${team.id}`} />);
    // }

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
            <Header channelName={getSingleUser.username} />
            <DirectMessageList teamId={teamIdInt} userId={userIdInt} fetching={userLoading} />
            <SendMessage
                onSubmit={async (text) => {
                    await createMessage(
                        {
                            variables: {
                                teamId: team.id,
                                receiverId: userIdInt,
                                message: text,
                            },
                            update: (proxy) => {
                                // Read the data from our cache for this query.
                                const cache = proxy.readQuery({ query: GET_USER });
                                // Write our data back to the cache with the new channel in it
                                const userDoesNotExist = cache.getUser.teams[teamIndex].directMessageMembers.every(user => user.id !== userIdInt);
                                if (userDoesNotExist) {
                                    cache.getUser.teams[teamIndex].directMessageMembers.unshift({
                                        id: userIdInt,
                                        username: getSingleUser.username,
                                        __typename: 'User',
                                    });
                                    proxy.writeQuery({
                                        query: GET_USER,
                                        data: cache,
                                    });
                                }
                            },
                        },
                    );
                }}
                header={getSingleUser.username}
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
