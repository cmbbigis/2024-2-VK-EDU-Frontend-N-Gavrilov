import React from 'react';

import './chatHeader.scss';

export const ChatHeader = (chatId) => {
    const chats = JSON.parse(localStorage.getItem('chats')) || [];
    if (!chats) {
        return null;
    }
    const chat = chats.find(chat => chat.id === chatId);

    if (!chat) {
        return null;
    }

    return (
        <div className="header">
            <a className="header-button back-to-chat-list-link" href="./index.html">
                <span className="material-symbols-outlined">arrow_back</span>
            </a>
            <img className="avatar" alt="Avatar" src={chat.avatar} />
            <div className="header-text">
                <span className="name">{chat.interlocutor}</span>
                <span className="status">была 2 часа назад</span>
            </div>
            <button className="header-button search-button">
                <span className="material-symbols-outlined">search</span>
            </button>
            <button className="header-button options-button">
                <span className="material-symbols-outlined">more_vert</span>
            </button>
        </div>
    );
}
