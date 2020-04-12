import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import SideBarListItem from './sideBarListItem';
import Bubble from './Bubble';

const UserListItem = ({ id, username }, teamId) => (
    <Link to={`/teamview/dm/${teamId}/${id}`} key={`direct-message-${id}`}>
        <SideBarListItem key={`user-${id}`}>
            <Bubble /> {username}
        </SideBarListItem>
    </Link>
);

UserListItem.propTypes = {
    id: PropTypes.string,
    username: PropTypes.string,
};

UserListItem.defaultProps = {
    id: '',
    username: '',
};

export default UserListItem;
