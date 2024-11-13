import React from 'react';
import DoneAllIcon from '@mui/icons-material/DoneAll';

import './chat.scss';

export const Chat = ({ id, interlocutor, avatar }) => {
    const lastMessage = getLastMessage(id);
    return (
        <div className="chat">
            <img className="avatar" alt="Avatar" src={avatar} />
            <div className="chat-info">
                <h2 className="chat-title">{interlocutor}</h2>
                <p className="chat-last-message">{lastMessage.text}</p>
            </div>
            <div className="chat-meta">
                <span className="last-message-time">{lastMessage.time}</span>
                <DoneAllIcon />
            </div>
        </div>
    );
}

function getLastMessage(chatId) {
    const messages = JSON.parse(localStorage.getItem('messages')) || [];
    const filteredMessages = messages.filter(message => message.chatId === chatId) || [];
    return filteredMessages[filteredMessages.length - 1] || { text: '', time: '' };
}
