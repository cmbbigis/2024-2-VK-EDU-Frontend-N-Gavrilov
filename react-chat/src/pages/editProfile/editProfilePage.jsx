import React, {useEffect, useRef, useState} from 'react';
import { useNavigate } from 'react-router-dom';
import PhotoCameraIcon from "@mui/icons-material/PhotoCamera";

import './editProfilePage.scss';
import { EditProfileHeader } from "../../components/editProfile";
import {BackendClient} from "../../utils/backendClient";

export const EditProfilePage = () => {
    const [currentUser, setCurrentUser] = useState(JSON.parse(localStorage.getItem('currentUser')));
    const [profileAvatar, setProfileAvatar] = useState(currentUser['avatar']);
    const [profileFullName, setProfileFullName] = useState(`${currentUser['first_name']} ${currentUser['last_name']}`);
    const [profileUsername, setProfileUsername] = useState(currentUser['username']);
    const [profileBio, setProfileBio] = useState(currentUser['bio']);
    const [isBioChanged, setIsBioChanged] = useState(false);
    const [value, setValue] = useState('');

    const fileInputRef = useRef(null);
    const navigate = useNavigate();

    const textareaRef = useRef(null);

    useEffect(() => {
        const textarea = textareaRef.current;
        textarea.style.height = 'auto';
        textarea.style.height = `${textarea.scrollHeight}px`;
    }, [value]);

    const handleChange = (event) => {
        setValue(event.target.value);
    };

    const handleImageClick = () => {
        fileInputRef.current.click();
    };

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        const reader = new FileReader();
        reader.onload = handleImageLoad;
        reader.readAsDataURL(file);
    };

    const handleImageLoad = (e) => {
        const img = new Image();
        img.src = e.target.result;
        img.onload = () => resizeImage(img);
    };

    const resizeImage = (img) => {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        const maxWidth = 100;
        const maxHeight = 100;
        let { width, height } = img;

        if (width > height && width > maxWidth) {
            height *= maxWidth / width;
            width = maxWidth;
        } else if (height > maxHeight) {
            width *= maxHeight / height;
            height = maxHeight;
        }

        canvas.width = width;
        canvas.height = height;
        ctx.drawImage(img, 0, 0, width, height);
        const resizedAvatarDataUrl = canvas.toDataURL('image/jpeg');
        setProfileAvatar(resizedAvatarDataUrl);
    };

    async function handleSave() {
        const form = document.getElementById("edit-profile-form");
        if (!form.checkValidity()) {
            form.reportValidity();
            return;
        }

        let formData = new FormData(form);

        if (profileAvatar !== null) {
            formData.set('avatar', profileAvatar);
            currentUser['avatar'] = profileAvatar;
        }

        const temp = profileFullName.split(' ');
        formData.set('first_name', temp[0]);
        currentUser['first_name'] = temp[0];
        if (temp.length > 1) {
            formData.set('last_name', temp[1]);
            currentUser['last_name'] = temp[1];
        }

        formData.set('username', profileUsername);
        currentUser['username'] = profileUsername;

        if (isBioChanged) {
            formData.set('bio', profileBio);
            currentUser['bio'] = profileBio;
        }
        await BackendClient.editProfile(currentUser['id'], formData);
        setCurrentUser(currentUser);
        localStorage.setItem('currentUser', JSON.stringify(currentUser));

        navigate('/profile/');
    };

    return (
        <div className="editProfilePage">
            <EditProfileHeader onSave={handleSave}/>
            <form className="edit-profile-info" id="edit-profile-form" encType="multipart/form-data">
                <div className="profile-avatar-input-container" onClick={handleImageClick}>
                    <img className="profile-avatar-input"
                         alt="Avatar"
                         src={profileAvatar}
                    />
                    <span className="overlay">
                    <PhotoCameraIcon/>
                </span>
                    <input
                        type="file"
                        accept="image/*"
                        ref={fileInputRef}
                        style={{display: 'none'}}
                        name="avatar"
                        onChange={handleFileChange}
                    />
                </div>
                <div className="container profile-full-name-input">
                    <label className="info-label" htmlFor="profile-full-name">Имя</label>
                    <input className="info-input profile-full-name-input"
                           name="profile-full-name"
                           type="text"
                           value={profileFullName}
                           onChange={(e) => setProfileFullName(e.target.value)}
                           required
                    />
                </div>
                <div className="profile-username-input-container-with-about">
                    <div className="container profile-username-input">
                        <label className="info-label" htmlFor="username">Имя пользователя</label>
                        <input className="info-input profile-username-input"
                               name="username"
                               type="text"
                               value={profileUsername}
                               onChange={(e) => setProfileUsername(e.target.value)}
                               required
                               minLength={5}
                        />
                    </div>
                    <span className="about">Минимум 5 символов</span>
                </div>
                <div className="profile-bio-input-container-with-about">
                    <div className="container profile-bio-input">
                        <label className="info-label" htmlFor="bio">Описание профиля</label>
                        <textarea className="info-input profile-bio-input"
                               name="bio"
                               ref={textareaRef}
                               value={profileBio}
                               onChange={(e) => {
                                   handleChange(e)
                                   setProfileBio(e.target.value)
                                   setIsBioChanged(true);
                               }}
                               style={{ overflow: 'hidden' }}
                        />
                    </div>
                    <span className="about">Какие-нибудь подробности о вас</span>
                </div>
            </form>
        </div>
    );
}
