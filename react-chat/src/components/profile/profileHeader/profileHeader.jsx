import React from 'react';
import {useNavigate} from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import EditIcon from '@mui/icons-material/Edit';

import './profileHeader.scss';

export const ProfileHeader = () => {
    const navigate = useNavigate();

    return (
        <div className="header">
            <button onClick={() => navigate("/chats/")} className="header-button back-to-chat-list-link">
                <ArrowBackIcon/>
            </button>
            <div className="header-text">
                <span className="name">Profile</span>
            </div>
            <button onClick={() => navigate("/editProfile/")} className="header-button edit-button">
                <EditIcon/>
            </button>
        </div>
    );
}

