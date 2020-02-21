import React from 'react';
import PropTypes from 'prop-types';

const TeamListItem = ({ id, name }) => (
    <li key={`team-${id}`}>
        {name}
    </li>
);

TeamListItem.propTypes = {
    id: PropTypes.string,
    name: PropTypes.string,
};

TeamListItem.defaultProps = {
    id: '',
    name: '',
};

export default TeamListItem;
