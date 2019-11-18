import React from 'react';
import { useHistory } from 'react-router-dom';
import { Container, Header } from 'semantic-ui-react';

const Home = () => {
    const history = useHistory();
    const navigateRegister = () => {
        history.push('/register');
    };

    return (
        <Container text>
            <p>!!!</p>
            <Header onClick={navigateRegister}>Click to go to registration</Header>
        </Container>
    );
};

export default Home;
