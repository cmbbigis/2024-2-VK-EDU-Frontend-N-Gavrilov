import React from 'react';
import { Link } from "react-router-dom";
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';

import './chatListHeader.scss';

export const ChatListHeader = () => {
    return (
        <div className="header">
            <Link to={"profile/"} className="header-button menu-button">
                <MenuIcon />
            </Link>
            <div className="header-text">
                <span className="name">Messenger</span>
            </div>
            <button className="header-button search-button">
                <SearchIcon />
            </button>
        </div>
    );
}
