import React, { useState } from 'react';

import './profileInfo.scss';

export const ProfileInfo = () => {
    const [profileAvatar] = useState(InitializeProfileAvatar);
    const [profileFullName] = useState(InitializeProfileFullName);
    const [profileUsername] = useState(InitializeProfileUsername);
    const [profileBio] = useState(InitializeProfileBio);

    return (
        <div className="profile-info">
            <img className="profile-avatar" alt="Avatar" src={profileAvatar}/>
            <div className="container profile-full-name">
                <label className="info-label profile-full-name-label">Имя</label>
                <span className="profile-full-name">{profileFullName}</span>
            </div>
            <div className="container profile-username">
                <label className="info-label profile-username-label">Имя пользователя</label>
                <span className="profile-username">{profileUsername}</span>
            </div>
            <div className="container profile-bio">
                <label className="info-label profile-bio-label">Описание профиля</label>
                <span className="profile-bio">{profileBio}</span>
            </div>
        </div>
    );

    function InitializeProfileAvatar() {
        const data = localStorage.getItem('profileAvatar')
        if (data === null || data === undefined) {
            const empty = '';
            localStorage.setItem('profileAvatar', empty);
            return empty;
        } else {
            return data;
        }
    }

    function InitializeProfileFullName() {
        const data = localStorage.getItem('profileFullName')
        if (data === null || data === undefined || data === '') {
            const empty = 'Empty full name';
            localStorage.setItem('profileFullName', empty);
            return empty;
        } else {
            return data;
        }
    }

    function InitializeProfileUsername() {
        const data = localStorage.getItem('profileUsername')
        if (data === null || data === undefined || data === '') {
            const empty = '@empty_username';
            localStorage.setItem('profileUsername', empty);
            return empty;
        }  else {
            return data;
        }
    }

    function InitializeProfileBio() {
        const data = localStorage.getItem('profileBio')
        if (data === null || data === undefined) {
            const empty = '';
            localStorage.setItem('profileBio', empty);
            return empty;
        }  else {
            return data;
        }
    }
}

