import React from 'react';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';

import './chatListHeader.scss';

export const ChatListHeader = () => {
    return (
        <div className="header">
            <button className="header-button menu-button">
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
