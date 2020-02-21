import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Header as SemanticHeader } from 'semantic-ui-react';

const HeaderWrapper = styled.div`
    grid-column: 3;
    grid-row: 1;
    background-color: #252526;
    color: #ff9900 !important;
`;

const StyledHeader = styled(SemanticHeader)({
    color: '#ff9900 !important',
});

const Header = ({ channelName }) => {
    return (
        <HeaderWrapper>
            <StyledHeader>#{channelName}</StyledHeader>
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
