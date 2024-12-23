import React from 'react';
import EditIcon from '@mui/icons-material/Edit';

import './createChatButton.scss';
import PropTypes from "prop-types";

export const CreateChatButton = ({ onClick }) => {
    return (
        <button className="create-chat-button" onClick={onClick}>
            <EditIcon className="editIcon"/>
        </button>
    );
}

CreateChatButton.propTypes = {
    onClick: PropTypes.func.isRequired
};
