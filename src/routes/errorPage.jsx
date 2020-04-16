import React, { memo } from 'react';
import { useHistory } from 'react-router-dom';
import { Container, Header, Button } from 'semantic-ui-react';
import Navbar from '../components/navbar';

const ErrorPage = () => {
    const history = useHistory();

    return (
        <>
            <Navbar />
            <Container>
                <Header color="orange" as="h2">Something went wrong! Please try again later</Header>
                <Button color="orange" onClick={() => history.push('/home')}>Return Home</Button>
            </Container>
        </>
    );
};

export default memo(ErrorPage);
