import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import TeamListItem from './listItems/teamListItem';

const TeamWrapper = styled.div`
    grid-column: 1;
    grid-row: 1 / 4;
    background-color: #333333;
`;

const TeamList = styled.ul`
    width: 100%;
    padding-left: 0px;
    list-style: none;
`;

const Teams = ({ teams }) => {
    return (
        <TeamWrapper>
            <TeamList>
                {teams.map(TeamListItem)}
            </TeamList>
        </TeamWrapper>
    );
};

Teams.propTypes = {
    teams: PropTypes.arrayOf(PropTypes.object),
};

Teams.defaultProps = {
    teams: [],
};

export default Teams;
