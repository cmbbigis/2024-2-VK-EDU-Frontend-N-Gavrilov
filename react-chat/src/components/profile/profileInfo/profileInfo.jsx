import React from 'react';

import './profileInfo.scss';
import {useDispatch, useSelector} from "react-redux";
import {logout} from "../../../redux/slice";
import {LazyImage} from "../../LazyImage";

export const ProfileInfo = () => {
    const { currentUser } = useSelector((state) => state.slice)
    const dispatch = useDispatch();

    return (
        <div className="profile-info">
            <LazyImage className="profile-avatar" alt="Avatar" src={currentUser['avatar']}/>
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
            <button className="logoutButton" onClick={() => dispatch(logout())}>Выйти</button>
        </div>
    );
}

