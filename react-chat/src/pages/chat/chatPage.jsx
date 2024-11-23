import React from 'react';
import { useParams } from "react-router-dom";

import './chatPage.scss';
import { ChatHeader, ChatScreen } from '../../components/chat';
import { NotFoundPage } from "../error";

export const ChatPage = () => {
    const { chatId } = useParams();
    // const chats = JSON.parse(localStorage.getItem('chats')) || [];
    // if (!chats) {
    //     return <NotFoundPage />;
    // }
    // const chat = chats.find(chat => chat.id === +chatId);
    //
    // if (!chat) {
    //     return <NotFoundPage />;
    // }

    return (
        <div id="chatPage">
            <ChatHeader chatId={chatId} />
            <ChatScreen chatId={chatId} />
        </div>
    );
}
