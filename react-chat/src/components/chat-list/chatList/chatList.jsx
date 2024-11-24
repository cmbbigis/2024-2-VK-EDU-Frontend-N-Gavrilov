import React, { useEffect, useState } from 'react';

import './chatList.scss';
import { Chat } from "../chat";
import { BackendHttpClient } from "../../../utils/backendHttpClient";

export const ChatList = ({ reload }) => {
    const [chats, setChats] = useState([]);

    useEffect(() => {
        loadChats();
    }, [reload]);

    async function loadChats() {
        setChats((await BackendHttpClient.getChats(null, null, null))["results"]);
    }

    return (
        <div id="chat-list" className="chat-list">
            {chats.map((chat) => (
                <Chat key={chat["id"]} id={chat["id"]} interlocutor={chat["title"]} avatar={chat["avatar"]} lastMessage={chat["last_message"]}/>
            ))}
        </div>
    );
}
