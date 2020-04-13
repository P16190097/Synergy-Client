import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const TeamListIcon = styled.li`
    height: 75px;
    background-color: #676066;
    color: #fff;
    margin: auto;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 24px;
    font-weight: bold;
    &:hover {
        // border-style: solid;
        // border-width: thick;
        // boder-color: #767676;
        background-color: #ff9900;
    }
`;

const ActiveTeamListIcon = styled.li`
    height: 75px;
    background-color: #f2711c;
    color: #fff;
    margin: auto;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 24px;
    font-weight: bold;
`;

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
