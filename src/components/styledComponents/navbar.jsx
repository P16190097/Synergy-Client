import React from 'react';
import { useHistory } from 'react-router-dom'
import { Button } from 'semantic-ui-react';
import styled from 'styled-components';

const NavbarContainer = styled.div`
    grid-column: 1 / 4;
    grid-row: 1;
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
            <Button color="orange" size="tiny" floated="right" onClick={() => logout()}>
                Logout
            </Button>
        </NavbarContainer>
    );
};

export default Navbar;
