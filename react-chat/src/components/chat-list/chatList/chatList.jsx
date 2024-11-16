import React, { useEffect, useState } from 'react';
import { Link } from "react-router-dom";

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
                <Link to={`chat/${id}`} key={id}>
                    <Chat id={id} interlocutor={interlocutor} avatar={avatar}/>
                </Link>
            ))}
        </div>
    );
}
