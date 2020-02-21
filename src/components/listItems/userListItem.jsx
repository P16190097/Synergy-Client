import React from 'react';
import PropTypes from 'prop-types';
import SideBarListItem from './sideBarListItem';
import Bubble from './Bubble';

const UserListItem = ({ id, name }) => (
    <SideBarListItem key={`user-${id}`}>
        <Bubble /> {name}
    </SideBarListItem>
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
