import React, { useState } from 'react';

import './profileInfo.scss';

export const ProfileInfo = () => {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));

    return (
        <div className="profile-info">
            <img className="profile-avatar" alt="Avatar" src={currentUser['avatar']}/>
            <div className="container profile-full-name">
                <label className="info-label profile-full-name-label">Имя</label>
                <span className="profile-full-name">{`${currentUser['first_name']} ${currentUser['last_name']}`}</span>
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

