import React from 'react';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import SearchIcon from '@mui/icons-material/Search';
import MoreVertIcon from '@mui/icons-material/MoreVert';

import './chatHeader.scss';

export const ChatHeader = ({ chatId, onBack }) => {
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
            <a className="header-button back-to-chat-list-link" onClick={onBack}>
                <ArrowBackIcon />
            </a>
            <img className="avatar" alt="Avatar" src={chat.avatar} />
            <div className="header-text">
                <span className="name">{chat.interlocutor}</span>
                <span className="status">была 2 часа назад</span>
            </div>
            <button className="header-button search-button">
                <SearchIcon />
            </button>
            <button className="header-button options-button">
                <MoreVertIcon />
            </button>
        </div>
    );
}
