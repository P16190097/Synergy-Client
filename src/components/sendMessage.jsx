import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { Input } from 'semantic-ui-react';

const SendMessageWrapper = styled.div`
    grid-column: 3;
    grid-row: 3;
    margin: 20px;
`;

const SendMessage = ({ channelName }) => {
    return (
        <SendMessageWrapper>
            <Input fluid placeholder={`# ${channelName}`} />
        </SendMessageWrapper>
    );
};

SendMessage.propTypes = {
    channelName: PropTypes.string,
};

SendMessage.defaultProps = {
    channelName: '',
};

export default SendMessage;
