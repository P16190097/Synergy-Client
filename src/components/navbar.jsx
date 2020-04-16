import React from 'react';
import { useHistory } from 'react-router-dom';
import { Button, Image } from 'semantic-ui-react';
import styled from 'styled-components';

const NavbarContainer = styled.div`
    grid-column: 1 / 4;
    grid-row: 1;
    padding: 10px;
    background-color: #252526;
`;

const Navbar = () => {
    const history = useHistory();

    const logout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('refreshToken');
        history.push('/login');
    };

    return (
        <NavbarContainer>
            <Image src="/img/logo.png" href="/home" size="small" inline className="logo" />
            <Button color="orange" size="tiny" floated="right" onClick={logout}>
                Logout
            </Button>
        </NavbarContainer>
    );
};

export default Navbar;
