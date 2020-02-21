import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const TeamListIcon = styled.li`
    height: 50px;
    width: 50px;
    background-color: #676066;
    color: #fff;
    margin: auto;
    margin-bottom: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-sze: 24px;
    border-radius: 11px;
    font-weight: bold;
    &:hover {
        border-style: solid;
        border-width: thick;
        boder-color: #767676;
    }
`;

const TeamListItem = ({ id, letter }) => (
    <Link to={`/teamview/${id}`}>
        <TeamListIcon key={`team-${id}`}>
            {letter}
        </TeamListIcon>
    </Link>
);

TeamListItem.propTypes = {
    id: PropTypes.string,
    letter: PropTypes.string,
};

TeamListItem.defaultProps = {
    id: '',
    letter: '',
};

export default TeamListItem;
