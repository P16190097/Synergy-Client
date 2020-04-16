import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import SideBarListItem from './sideBarListItem';

const ChannelListItem = ({ id, name }, teamId) => (
    <Link to={`/team/${teamId}/${id}`} key={`channel-${id}`}>
        <SideBarListItem>
            # {name}
        </SideBarListItem>
    </Link>
);

ChannelListItem.propTypes = {
    id: PropTypes.string,
    name: PropTypes.string,
};

ChannelListItem.defaultProps = {
    id: '',
    name: '',
};

export default ChannelListItem;
