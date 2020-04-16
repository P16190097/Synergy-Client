import React from 'react';
import { useHistory } from 'react-router-dom';
import { Container, Header, Item, Divider, Button } from 'semantic-ui-react';
import { useQuery } from '@apollo/react-hooks';
import Navbar from '../components/navbar';
import TeamDetailsListItem from '../components/listItems/teamDetailsListItem';
import { GET_USERS_TEAMS } from '../gql/team';

const Home = () => {
    const { loading, error, data } = useQuery(GET_USERS_TEAMS);

    const history = useHistory();

    if (loading || error) {
        return null;
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
                                <TeamDetailsListItem team={team} key={`team-${team.id}`} />
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
