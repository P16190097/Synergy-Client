import React from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import { Item, Divider, Button } from 'semantic-ui-react';

const TeamDetailsListItem = ({ team, leaveTeam }) => {
    const history = useHistory();

    return (
        <>
            <Item>
                <Item.Content>
                    <Item.Header className="message-name">
                        {team.name}
                    </Item.Header>
                    <Item.Meta className="message-time">
                        {team.admin ? 'Admin' : 'Member'}
                    </Item.Meta>
                    <Item.Description className="message-text">
                        {team.description}
                    </Item.Description>
                </Item.Content>
                {team.admin && <Button color="orange" onClick={() => history.push(`/edit/team/${team.id}`)}>Edit</Button>}
                <Button color="orange" onClick={() => history.push(`/team/${team.id}`)}>View</Button>
                {!team.admin && <Button negative onClick={leaveTeam(team.id)}>Leave Team</Button>}
            </Item>
            <Divider />
        </>
    );
};

TeamDetailsListItem.propTypes = {
    // eslint-disable-next-line react/forbid-prop-types
    team: PropTypes.object,
    leaveTeam: PropTypes.func,
};

TeamDetailsListItem.defaultProps = {
    team: {},
    leaveTeam: () => { },
};

export default TeamDetailsListItem;
