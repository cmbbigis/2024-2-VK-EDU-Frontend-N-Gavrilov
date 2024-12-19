import React, {useEffect} from 'react';
import { useParams } from "react-router-dom";

import './chatPage.scss';
import { ChatHeader, ChatScreen } from '../../components/chat';

export const ChatPage = ({ setCurrentChatId }) => {
    const { chatId } = useParams();

    useEffect(() => {
        setCurrentChatId(chatId);
    }, [chatId, setCurrentChatId]);

    return (
        <div id="chatPage">
            <ChatHeader chatId={chatId} />
            <ChatScreen chatId={chatId} />
        </div>
    );
}
