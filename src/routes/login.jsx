import React, { memo } from 'react';
import { useHistory } from 'react-router-dom';
import { Container, Header } from 'semantic-ui-react';

const Login = () => {
    const history = useHistory();
    const navigateRegister = () => {
        history.push('/register');
    };

    return (
        <Container text>
            <Header onClick={navigateRegister}>Click to go to registration</Header>
        </Container>
    );
};

export default memo(Login);
