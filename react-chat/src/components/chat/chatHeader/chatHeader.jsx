import React from 'react';
import { Link } from "react-router-dom";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import SearchIcon from '@mui/icons-material/Search';
import MoreVertIcon from '@mui/icons-material/MoreVert';

import './chatHeader.scss';

export const ChatHeader = ({ chatId }) => {
    const chats = JSON.parse(localStorage.getItem('chats')) || [];
    const chat = chats.find(chat => chat.id === chatId);

    return (
        <div className="header">
            <button className="header-button back-to-chat-list-link">
                <Link to={"/"}>
                    <ArrowBackIcon />
                </Link>
            </button>
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
