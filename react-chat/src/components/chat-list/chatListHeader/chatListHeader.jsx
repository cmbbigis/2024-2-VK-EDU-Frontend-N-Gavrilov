import React from 'react';

import './chatListHeader.scss';

export const ChatListHeader = () => {
    return (
        <div className="header">
            <button className="header-button menu-button">
                <span className="material-symbols-outlined">menu</span>
            </button>
            <div className="header-text">
                <span className="name">Messenger</span>
            </div>
            <button className="header-button search-button">
                <span className="material-symbols-outlined">search</span>
            </button>
        </div>
    );
}
