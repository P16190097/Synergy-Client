import React from 'react';
import PropTypes from 'prop-types';

const ChannelListItem = ({ id, name }) => (
    <li key={`channel-${id}`}>
        # {name}
    </li>
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
