import React from 'react';
import AppLayout from '../components/appLayout';
import Channels from '../components/channels';
import Teams from '../components/teams';
import Header from '../components/header';
import Messages from '../components/messages';
import Input from '../components/input';

const ViewTeam = () => {
    return (
        <AppLayout>
            <Teams>Teams</Teams>
            <Channels
                teamName="Demo Team"
                userName="Demo User"
                channels={[{ id: 1, name: 'general' }, { id: 2, name: 'random' }]}
                users={[{ id: 1, name: 'slack-bot' }, { id: 2, name: 'user1' }]}
            >
                Channels
            </Channels>
            <Header>Header</Header>
            <Messages>
                <ul className="message-list">
                    <li />
                    <li />
                </ul>
            </Messages>
            <Input>
                <input type="text" placeholder="CSS Grid Layout Module" />
            </Input>
        </AppLayout>
    );
};

export default ViewTeam;
