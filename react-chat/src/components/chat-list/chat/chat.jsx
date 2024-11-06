import React from 'react';

import './chat.scss';

export const Chat = (chatId, interlocutor, avatarFile) => {
    const lastMessage = getLastMessage(chatId);

    return (
        <a className="chat-link" href={`./chat.html?id=${chatId}`}>
            <div className="chat">
                <img className="avatar" alt="Avatar" src={avatarFile} />
                <div className="chat-info">
                    <h2 className="chat-title">{interlocutor}</h2>
                    <p className="chat-last-message">{lastMessage.text}</p>
                </div>
                <div className="chat-meta">
                    <span className="last-message-time">{lastMessage.time}</span>
                    <span className="material-symbols-outlined">done_all</span>
                </div>
            </div>
        </a>
    );
}

function getLastMessage(chatId) {
    const messages = JSON.parse(localStorage.getItem('messages')) || [];
    const filteredMessages = messages.filter(message => message.chatId === chatId) || [];
    return filteredMessages[filteredMessages.length - 1] || { text: '', time: '' };
}
