import React from 'react';
import PulseLoader from 'react-spinners/PulseLoader';
import PropTypes from 'prop-types';
import { css } from '@emotion/core';


const LoadingSpinner = ({ loading }) => {
    const override = css`
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    `;

    return (
        <PulseLoader
            css={override}
            sizeUnit="px"
            size={15}
            color="#012A40"
            loading={loading}
        />
    );
};

LoadingSpinner.propTypes = {
    loading: PropTypes.bool.isRequired,
};

export default LoadingSpinner;
