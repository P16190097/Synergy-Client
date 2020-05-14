import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Icon } from 'semantic-ui-react';
import SideBarListItem from './sideBarListItem';

const ChannelListItem = ({ id, name }, teamId, isOwner, setDeleteId) => (
    <div className="list-channnel-item" key={`channel-${id}`}>
        <Link to={`/team/${teamId}/${id}`}>
            <SideBarListItem>
                # {name}
            </SideBarListItem>
        </Link>
        {isOwner && (
            <Icon
                name="remove circle"
                className="hidden"
                onClick={() => setDeleteId(id)}
            />
        )}
    </div>
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
