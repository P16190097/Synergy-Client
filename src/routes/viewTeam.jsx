import React from 'react';
import AppLayout from '../components/appLayout';
import Channels from '../components/channels';
import Teams from '../components/teams';
import Header from '../components/header';
import Messages from '../components/messages';
import SendMessage from '../components/sendMessage';

const ViewTeam = () => {
    return (
        <AppLayout>
            <Teams
                teams={[{ id: 1, name: '1' }, { id: 2, name: '2' }]}
            >
                Teams
            </Teams>
            <Channels
                teamName="Demo Team"
                username="Demo User"
                channels={[{ id: 1, name: 'general' }, { id: 2, name: 'random' }]}
                users={[{ id: 1, name: 'slack-bot' }, { id: 2, name: 'user1' }]}
            >
                Channels
            </Channels>
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
