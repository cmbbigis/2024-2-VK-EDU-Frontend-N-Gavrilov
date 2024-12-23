import React from 'react';

import './profileInfo.scss';
import {useSelector} from "react-redux";

export const ProfileInfo = () => {
    const { currentUser } = useSelector((state) => state.slice)

    return (
        <div className="profile-info">
            <img className="profile-avatar" alt="Avatar" src={currentUser['avatar']}/>
            <div className="container profile-first-name">
                <label className="info-label profile-first-name-label">Имя</label>
                <span className="profile-first-name">{`${currentUser['first_name']}`}</span>
            </div>
            <div className="container profile-last-name">
                <label className="info-label profile-last-name-label">Фамилия</label>
                <span className="profile-last-name">{`${currentUser['last_name']}`}</span>
            </div>
            <div className="container profile-username">
                <label className="info-label profile-username-label">Имя пользователя</label>
                <span className="profile-username">{currentUser['username']}</span>
            </div>
            <div className="container profile-bio">
                <label className="info-label profile-bio-label">Описание профиля</label>
                <span className="profile-bio">{currentUser['bio']}</span>
            </div>
        </div>
    );
}

