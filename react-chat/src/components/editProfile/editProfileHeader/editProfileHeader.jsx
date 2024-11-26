import React from 'react';
import { Link } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import DoneIcon from '@mui/icons-material/Done';

import './editProfileHeader.scss';

export const EditProfileHeader = ({ onSave }) => {
    return (
        <div className="header">
            <Link to={"/profile/"} className="header-button back-to-profile-link">
                <ArrowBackIcon />
            </Link>
            <div className="header-text">
                <span className="name">Edit profile</span>
            </div>
            <button className="header-button save-button" onClick={onSave}>
                <DoneIcon />
            </button>
        </div>
    );
}

