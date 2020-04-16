import styled from 'styled-components';

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
    margin-top: 1px;
    &:hover {
        // border-style: solid;
        // border-width: thick;
        // boder-color: #767676;
        background-color: #ff9900;
    }
    &:first {
        margin-top: none;
    }
`;

export default TeamListIcon;
