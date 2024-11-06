import React from 'react';

import './chatPage.scss';
import { ChatHeader, ChatScreen } from '../../components/chat';

export const ChatPage = () => {
    const params = new URLSearchParams(window.location.search);
    const chatId = +params.get('id');

    return (
        <div id="app">
            <ChatHeader chatId={chatId} />
            <ChatScreen chatId={chatId} />
        </div>
    );
}
