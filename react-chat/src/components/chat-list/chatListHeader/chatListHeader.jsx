import React from 'react';
import { useNavigate } from "react-router-dom";

import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';

import './chatListHeader.scss';

export const ChatListHeader = () => {
    const navigate = useNavigate();

    return (
        <div className="header">
            <button onClick={() => navigate("/profile/")} className="header-button menu-button">
                <MenuIcon />
            </button>
            <div className="header-text">
                <span className="name">Messenger</span>
            </div>
            <button className="header-button search-button">
                <SearchIcon />
            </button>
        </div>
    );
}
