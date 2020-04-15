import React from 'react';
import { useHistory } from 'react-router-dom';
import { Container, Header, Item, Divider, Button } from 'semantic-ui-react';
import { useQuery } from '@apollo/react-hooks';
import Navbar from '../components/navbar';
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
                <Header color="orange" as="h2">Home</Header>
                <Button color="orange" onClick={() => history.push('/createteam')}>Create New Team</Button>
                <Divider />
                <Item.Group>
                    {teams ? teams.map(team => (
                        <>
                            <Item key={`team-${team.id}`}>
                                <Item.Content>
                                    <Item.Header className="message-name">
                                        {team.name}
                                    </Item.Header>
                                    <Item.Meta className="message-time">
                                        Meta Data Here
                                    </Item.Meta>
                                    <Item.Description className="message-text">
                                        Team Description goes here
                                    </Item.Description>
                                </Item.Content>
                                <Button color="orange" onClick={() => history.push(`/team/${team.id}`)}>Select</Button>
                            </Item>
                            <Divider />
                        </>
                    )) : (
                            <Header color="orange" as="h2">You don`&apos;`t belong to any teams yet, create one to start chatting!</Header>
                        )}
                </Item.Group>
            </Container>
        </>
    );
};

export default Home;
