import React, {useEffect, useState} from 'react';
import { Link } from "react-router-dom";
import DoneAllIcon from '@mui/icons-material/DoneAll';

import './chat.scss';
import {BackendHttpClient} from "../../../utils/backendHttpClient";

export const Chat = ({ id, interlocutor, avatar }) => {
    const [lastMessage, setLastMessage] = useState([]);

    useEffect(() => {
        getLastMessage(id);
    }, [id]);

    return (
        <Link to={`chat/${id}`} key={id} className={"chat-link"}>
            <div className="chat">
                <img className="avatar" alt="Avatar" src={avatar} />
                <div className="chat-info">
                    <h2 className="chat-title">{interlocutor}</h2>
                    <p className="chat-last-message">{lastMessage['text']}</p>
                </div>
                <div className="chat-meta">
                    <span className="last-message-time">{lastMessage['created_at']}</span>
                    <DoneAllIcon />
                </div>
            </div>
        </Link>
    );

    async function getLastMessage(chatId) {
        const lastMessage = (await BackendHttpClient.getChatMessages(chatId))["results"][0];
        setLastMessage(lastMessage);
    }
}
