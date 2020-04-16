import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import TeamListItem from './listItems/teamListItem';
import TeamListIcon from './styledComponents/teamListIcon';

const TeamWrapper = styled.div`
    grid-column: 1;
    grid-row: 2 / 5;
    background-color: #333333;
`;

const TeamList = styled.ul`
    margin: 0;
    width: 100%;
    padding-left: 0px;
    list-style: none;
    overflow-y: auto;
`;

const Teams = ({ teams }) => {
    return (
        <TeamWrapper>
            <TeamList>
                {teams.map(TeamListItem)}
                <Link key="create-team" to="/createteam">
                    <TeamListIcon key="create-team">
                        +
                    </TeamListIcon>
                </Link>
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
