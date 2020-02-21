import React from 'react';
import AppLayout from '../components/appLayout';
import Header from '../components/header';
import Messages from '../components/messages';
import SendMessage from '../components/sendMessage';
import SideBar from '../containers/sideBar';

const ViewTeam = () => {
    return (
        <AppLayout>
            <SideBar currentTeamId={13} />
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

export default ViewTeam;
