import React, { useEffect } from 'react';

import './chatList.scss';
import { loadChats } from '../createChatModal';

export function ChatList() {
    useEffect(() => {
        const chatList = document.getElementById('chat-list');
        loadChats(chatList);
    }, []);

    return <div id="chat-list" className="chat-list"></div>;
}
