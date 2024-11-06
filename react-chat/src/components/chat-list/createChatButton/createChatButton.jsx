import React from 'react';

import './createChatButton.scss';

export const CreateChatButton = (onClick) => {
    return (
        <button className="create-chat-button" onClick={onClick}>
            <span className="material-symbols-outlined">edit</span>
        </button>
    );
}
