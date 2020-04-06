import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Green = styled.span`color: #38978d;`;

const Bubble = ({ on = true }) => (on ? <Green>●</Green> : '○');

Bubble.propTypes = {
    on: PropTypes.bool,
};

Bubble.defaultProps = {
    on: true,
};

export default Bubble;
