import React from 'react';

import './chatPage.scss';
import { ChatHeader, ChatScreen } from '../../components/chat';

export const ChatPage = ({ chatId, onBack }) => {
    return (
        <div id="app">
            <ChatHeader chatId={chatId} onBack={onBack}/>
            <ChatScreen chatId={chatId} />
        </div>
    );
}
