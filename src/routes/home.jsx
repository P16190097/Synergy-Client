import React from 'react';
import { Container, Header } from 'semantic-ui-react';
import { useQuery } from '@apollo/react-hooks';
import { ALL_USERS } from '../gql/user';

const Home = () => {
    const { loading, error, data } = useQuery(ALL_USERS);

    if (loading || error) {
        return null;
    }

    const { allUsers } = data;

    return (
        <Container text>
            <Header as="h2">Home</Header>
            {allUsers.map(x => (<h1 key={`key-${x.id}`}>{x.email}</h1>))}
        </Container>
    );
};

export default Home;
