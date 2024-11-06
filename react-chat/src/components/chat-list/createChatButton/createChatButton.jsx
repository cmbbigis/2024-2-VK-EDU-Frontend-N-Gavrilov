import React from 'react';
import EditIcon from '@mui/icons-material/Edit';

import './createChatButton.scss';

export const CreateChatButton = (onClick) => {
    return (
        <button className="create-chat-button" onClick={onClick}>
            <EditIcon />
        </button>
    );
}
