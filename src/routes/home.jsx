import React from 'react';
import { useHistory } from 'react-router-dom';
import { Container, Header, Item, Divider, Button, Dimmer, Loader } from 'semantic-ui-react';
import { useQuery, useMutation } from '@apollo/react-hooks';
import Navbar from '../components/navbar';
import TeamDetailsListItem from '../components/listItems/teamDetailsListItem';
import { GET_USERS_TEAMS, LEAVE_TEAM } from '../gql/team';

const Home = () => {
    const history = useHistory();

    const navigateToError = () => {
        history.push('/error');
    };

    const [leaveTeam, { loading: submitting }] = useMutation(LEAVE_TEAM, {
        onCompleted: (resp) => {
            const { success, errors } = resp.leaveTeam;
            if (!success) {
                console.log(errors);
            } else {
                // eslint-disable-next-line no-restricted-globals
                location.reload();
            }
        },
        onError: (err) => {
            console.log('GraphQl failed');
            console.log(err);
            navigateToError();
        },
    });

    const { loading, data } = useQuery(GET_USERS_TEAMS, {
        fetchPolicy: 'network-only',
        onError: () => navigateToError(),
    });

    if (loading || submitting) {
        return (
            <Dimmer active>
                <Loader />
            </Dimmer>
        );
    }

    const { getUserTeams: teams } = data;

    return (
        <>
            <Navbar />
            <Container>
                <Header color="orange" as="h1">Home</Header>
                <Button color="orange" onClick={() => history.push('/createteam')}>Create New Team</Button>
                {teams.length ? (
                    <>
                        <Header color="orange" as="h2">Your teams</Header>
                        <Divider />
                        <Item.Group>
                            {teams.map(team => (
                                <TeamDetailsListItem
                                    team={team}
                                    leaveTeam={async (id) => {
                                        await leaveTeam({ variables: { teamId: parseInt(id, 10) } });
                                    }}
                                    key={`team-${team.id}`}
                                />
                            ))}
                        </Item.Group>
                    </>
                ) : (
                        <Header color="orange" as="h2">You don&apos;t belong to any teams yet, create one to start chatting!</Header>
                    )}
            </Container>
        </>
    );
};

export default Home;
