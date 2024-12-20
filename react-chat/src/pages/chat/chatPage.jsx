import React, {useEffect} from 'react';
import { useParams } from "react-router-dom";

import './chatPage.scss';
import { ChatHeader, ChatScreen } from '../../components/chat';
import {useDispatch} from "react-redux";
import {setCurrentChatId} from '../../redux/slice';

export const ChatPage = () => {
    const { chatId } = useParams();
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(setCurrentChatId(chatId));
    }, [chatId, dispatch]);

    return (
        <div id="chatPage">
            <ChatHeader chatId={chatId} />
            <ChatScreen chatId={chatId} />
        </div>
    );
}
