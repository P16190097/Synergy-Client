import React from 'react';
import PropTypes from 'prop-types';
import AppLayout from '../components/appLayout';
import Header from '../components/header';
import Messages from '../components/messages';
import SendMessage from '../components/sendMessage';
import SideBar from '../containers/sideBar';

const ViewTeam = ({ match: { params } }) => {
    return (
        <AppLayout>
            <SideBar currentTeamId={params.teamId} />
            <Header
                channelName="general"
            >
                Header
            </Header>
            <Messages>
                <ul className="message-list">
                    <li />
                    <li />
                </ul>
            </Messages>
            <SendMessage
                channelName="general"
            />
        </AppLayout>
    );
};

ViewTeam.propTypes = {
    // eslint-disable-next-line react/forbid-prop-types
    match: PropTypes.object,
};

ViewTeam.defaultProps = {
    match: {},
};

export default ViewTeam;
