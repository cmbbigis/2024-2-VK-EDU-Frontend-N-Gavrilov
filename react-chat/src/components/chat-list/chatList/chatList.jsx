import React, { useEffect, useState } from 'react';

import './chatList.scss';
import { Chat } from "../chat";

export const ChatList = ({ reload }) => {
    const [chats, setChats] = useState([]);

    useEffect(() => {
        setChats(loadChats());
    }, [reload]);

    function loadChats() {
        return JSON.parse(localStorage.getItem('chats')) || [];
    }

    return (
        <div id="chat-list" className="chat-list">
            {chats.map(({id, interlocutor, avatar}) => (
                <Chat id={id} interlocutor={interlocutor} avatar={avatar}/>
            ))}
        </div>
    );
}
