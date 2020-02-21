import React from 'react';
import PropTypes from 'prop-types';

const UserListItem = ({ id, name }) => (
    <li key={`user-${id}`}>
        {name}
    </li>
);

UserListItem.propTypes = {
    id: PropTypes.string,
    name: PropTypes.string,
};

UserListItem.defaultProps = {
    id: '',
    name: '',
};

export default UserListItem;
