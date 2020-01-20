import React, { memo, useState } from 'react';
import { Container, Header } from 'semantic-ui-react';

const home = () => {
    return (
        <Container text>
            <Header as="h2">Home</Header>
        </Container>
    );
}

export default memo(home);
