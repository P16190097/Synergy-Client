import React from 'react';
import PropTypes from 'prop-types';
import SideBarListItem from './sideBarListItem';

const ChannelListItem = ({ id, name }) => (
    <SideBarListItem key={`channel-${id}`}>
        # {name}
    </SideBarListItem>
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
