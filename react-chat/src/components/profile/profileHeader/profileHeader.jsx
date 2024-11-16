import React from 'react';
import { Link } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import EditIcon from '@mui/icons-material/Edit';

import './profileHeader.scss';

export const ProfileHeader = () => {
    return (
        <div className="header">
            <Link to={"/"} className="header-button back-to-chat-list-link">
                <ArrowBackIcon/>
            </Link>
            <div className="header-text">
                <span className="name">Profile</span>
            </div>
            <Link to={"/editProfile/"} className="header-button edit-button">
                <EditIcon/>
            </Link>
        </div>
    );
}

