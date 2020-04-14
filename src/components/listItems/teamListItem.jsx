import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import ActiveTeamListIcon from '../styledComponents/activeTeamListIcon';
import TeamListIcon from '../styledComponents/teamListIcon';

const TeamListItem = ({ id, letter, active }) => (
    <Link key={`team-${id}`} to={`/teamview/${id}`}>
        {active ? (
            <ActiveTeamListIcon key={`team-${id}`}>
                {letter}
            </ActiveTeamListIcon>
        ) : (
                <TeamListIcon key={`team-${id}`}>
                    {letter}
                </TeamListIcon>
            )}
    </Link>
);

TeamListItem.propTypes = {
    id: PropTypes.string,
    letter: PropTypes.string,
    active: PropTypes.bool,
};

TeamListItem.defaultProps = {
    id: '',
    letter: '',
    active: false,
};

export default TeamListItem;
