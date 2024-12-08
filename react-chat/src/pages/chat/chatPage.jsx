import React from 'react';
import { useParams } from "react-router-dom";

import './chatPage.scss';
import { ChatHeader, ChatScreen } from '../../components/chat';

export const ChatPage = () => {
    const { chatId } = useParams();

    return (
        <div id="chatPage">
            <ChatHeader chatId={chatId} />
            <ChatScreen chatId={chatId} />
        </div>
    );
}
