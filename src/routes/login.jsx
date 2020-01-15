import React, { memo } from 'react';
import { useHistory } from 'react-router-dom';
import { Container, Button } from 'semantic-ui-react';

const Login = () => {
    const history = useHistory();
    const navigateRegister = () => {
        history.push('/register');
    };

    return (
        <Container text>
            {/* <Header onClick={navigateRegister}>Click to go to registration</Header> */}
            <Button primary onClick={navigateRegister}>Sign Up</Button>
        </Container>
    );
};

export default memo(Login);
