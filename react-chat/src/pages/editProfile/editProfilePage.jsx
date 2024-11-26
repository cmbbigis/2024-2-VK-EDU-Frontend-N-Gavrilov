import React, {useEffect, useRef, useState} from 'react';
import { useNavigate } from 'react-router-dom';
import PhotoCameraIcon from "@mui/icons-material/PhotoCamera";

import './editProfilePage.scss';
import { EditProfileHeader } from "../../components/editProfile";

export const EditProfilePage = () => {
    const [profileAvatar, setProfileAvatar] = useState(localStorage.getItem('profileAvatar'));
    const [profileFullName, setProfileFullName] = useState(localStorage.getItem('profileFullName'));
    const [profileUsername, setProfileUsername] = useState(localStorage.getItem('profileUsername'));
    const [profileBio, setProfileBio] = useState(localStorage.getItem('profileBio'));
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

    const handleSave = () => {
        if (profileUsername.length < 6 || !profileUsername.startsWith('@')){
            alert('Имя пользователя должно быть не меньше 5 символов длиной и начинаться с символа @');
            return;
        }
        localStorage.setItem('profileAvatar', profileAvatar);
        if (profileFullName !== null && profileFullName !== '' && profileFullName.trim().length > 0) {
            localStorage.setItem('profileFullName', profileFullName);
        }
        if (profileUsername !== '') {
            localStorage.setItem('profileUsername', profileUsername);
        }
        if (isBioChanged) {
            localStorage.setItem('profileBio', profileBio);
        }
        navigate('/profile/');
    };

    return (
        <div className="editProfilePage">
            <EditProfileHeader onSave={handleSave}/>
            <div className="edit-profile-info">
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
                    />
                </div>
                <div className="profile-username-input-container-with-about">
                    <div className="container profile-username-input">
                        <label className="info-label" htmlFor="profile-username">Имя пользователя</label>
                        <input className="info-input profile-username-input"
                               name="profile-username"
                               type="text"
                               value={profileUsername}
                               onChange={(e) => setProfileUsername(e.target.value)}
                        />
                    </div>
                    <span className="about">Минимум 5 символов</span>
                </div>
                <div className="profile-bio-input-container-with-about">
                    <div className="container profile-bio-input">
                        <label className="info-label" htmlFor="profile-bio">Описание профиля</label>
                        <textarea className="info-input profile-bio-input"
                               name="profile-bio"
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
            </div>
        </div>
    );
}
