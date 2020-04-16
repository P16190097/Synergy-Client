import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Header as SemanticHeader } from 'semantic-ui-react';

const HeaderWrapper = styled.div`
    grid-column: 3;
    grid-row: 2;
    padding: 10px;
    background-color: #1e1e1e;
`;

// const StyledHeader = styled(SemanticHeader)({
//     color: '#ff9900 !important',
// });

const Header = ({ channelName }) => {
    return (
        <HeaderWrapper>
            <SemanticHeader color="orange">#{channelName}</SemanticHeader>
        </HeaderWrapper>
    );
};

Header.propTypes = {
    channelName: PropTypes.string,
};

Header.defaultProps = {
    channelName: '',
};

export default Header;
