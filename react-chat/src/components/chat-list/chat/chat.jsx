import React, { useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import { Centrifugo } from "../../../utils/Centrifugo";
import DoneAllIcon from '@mui/icons-material/DoneAll';

import './chat.scss';

export const Chat = ({ id, interlocutor, avatar, lastMessage }) => {
    const [latestMessage, setLatestMessage] = useState(lastMessage);

    useEffect(() => {
        return () => Centrifugo(id, null, setLatestMessage);
    }, [id, lastMessage]);

    return (
        <Link to={`chat/${id}`} key={id} className={"chat-link"}>
            <div className="chat">
                <img className="avatar" alt="Avatar" src={avatar} />
                <div className="chat-info">
                    <h2 className="chat-title">{interlocutor}</h2>
                    <p className="chat-last-message">{latestMessage['text']}</p>
                </div>
                <div className="chat-meta">
                    <span className="last-message-time">{latestMessage['created_at']}</span>
                    <DoneAllIcon />
                </div>
            </div>
        </Link>
    );
}
