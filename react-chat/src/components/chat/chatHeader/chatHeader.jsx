import React, {useEffect, useState} from 'react';
import { Link } from "react-router-dom";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import SearchIcon from '@mui/icons-material/Search';
import MoreVertIcon from '@mui/icons-material/MoreVert';

import './chatHeader.scss';
import {BackendClient} from "../../../utils/backendClient";
import {LazyImage} from "../../LazyImage";

export const ChatHeader = ({chatId}) => {
    const [chat, setChat] = useState([]);

    useEffect(() => {
        getChat(chatId);
    }, [chatId]);

    const getChat = async (chatId) => {
        setChat((await BackendClient.getChat(chatId)));
    };

    if (!chat) {
        return null;
    }

    return (
        <div className="header">
            <Link to={"/chats/"} className="header-button back-to-chat-list-link">
                <ArrowBackIcon/>
            </Link>
            <LazyImage className="avatar" alt="Avatar" src={chat['avatar']}/>
            <div className="header-text">
                <span className="name">{chat['title']}</span>
                <span className="status">была 2 часа назад</span>
            </div>
            <button className="header-button search-button">
                <SearchIcon/>
            </button>
            <button className="header-button options-button">
                <MoreVertIcon/>
            </button>
        </div>
    );
}
