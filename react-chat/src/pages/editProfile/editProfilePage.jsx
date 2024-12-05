import React, {useEffect, useRef, useState} from 'react';
import { useNavigate } from 'react-router-dom';
import PhotoCameraIcon from "@mui/icons-material/PhotoCamera";

import './editProfilePage.scss';
import { EditProfileHeader } from "../../components/editProfile";
import {BackendClient} from "../../utils/backendClient";

export const EditProfilePage = () => {
    const [currentUser, setCurrentUser] = useState(JSON.parse(localStorage.getItem('currentUser')));
    const [isBioChanged, setIsBioChanged] = useState(false);

    const [data, setData] = useState({
        "profile-first-name": currentUser?.first_name || '',
        "profile-last-name": currentUser?.last_name || '',
        "username": currentUser?.username || '',
        "bio": currentUser?.bio || '',
        "avatar": currentUser?.avatar || null
    });

    const handleInputChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;

        setValue(value);
        setData((prev) => ({ ...prev, [name]: value }));
    }

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        const fileURL = URL.createObjectURL(file);
        setData((prev) => ({ ...prev, avatar: file }));
        setData((prev) => ({ ...prev, avatarURL: fileURL }));
    }

    const [value, setValue] = useState('');

    const fileInputRef = useRef(null);
    const navigate = useNavigate();

    const textareaRef = useRef(null);

    useEffect(() => {
        const textarea = textareaRef.current;
        textarea.style.height = 'auto';
        textarea.style.height = `${textarea.scrollHeight}px`;
    }, [value]);

    const handleImageClick = () => {
        fileInputRef.current.click();
    };

    async function handleSave() {
        const form = document.getElementById("edit-profile-form");
        if (!form.checkValidity()) {
            form.reportValidity();
            return;
        }

        let formData = new FormData(form);

        if (typeof(data["avatar"]) === "object" && data["avatar"] !== null && data["avatar"] !== undefined) {
            formData.set('avatar', data["avatar"]);
        } else {
            formData.delete("avatar");
        }

        formData.set('first_name', data["profile-first-name"]);

        formData.set('last_name', data["profile-last-name"]);

        formData.set('username', data["username"]);

        if (isBioChanged) {
            formData.set('bio', data["bio"]);
        }

        const currentUserInfo = await BackendClient.editProfile(currentUser['id'], formData);
        currentUser['avatar'] = currentUserInfo["avatar"];
        currentUser['first_name'] = currentUserInfo["first_name"];
        currentUser['last_name'] = currentUserInfo["last_name"];
        currentUser['username'] = currentUserInfo["username"];
        currentUser['bio'] = currentUserInfo["bio"];
        setCurrentUser(currentUser);
        localStorage.setItem('currentUser', JSON.stringify(currentUser));

        navigate('/profile/');
    }

    return (
        <div className="editProfilePage">
            <EditProfileHeader onSave={handleSave}/>
            <form className="edit-profile-info" id="edit-profile-form" encType="multipart/form-data">
                <div className="profile-avatar-input-container" onClick={handleImageClick}>
                    <img className="profile-avatar-input"
                         alt="Avatar"
                         src={data["avatarURL"] || currentUser['avatar']}
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
                <div className="container profile-first-name-input">
                    <label className="info-label" htmlFor="profile-first-name">Имя</label>
                    <input className="info-input profile-first-name-input"
                           name="profile-first-name"
                           type="text"
                           value={data["profile-first-name"]}
                           onChange={handleInputChange}
                           required
                    />
                </div>
                <div className="container profile-last-name-input">
                    <label className="info-label" htmlFor="profile-last-name">Фамилия</label>
                    <input className="info-input profile-last-name-input"
                           name="profile-last-name"
                           type="text"
                           value={data["profile-last-name"]}
                           onChange={handleInputChange}
                           required
                    />
                </div>
                <div className="profile-username-input-container-with-about">
                    <div className="container profile-username-input">
                        <label className="info-label" htmlFor="username">Имя пользователя</label>
                        <input className="info-input profile-username-input"
                               name="username"
                               type="text"
                               value={data["username"]}
                               onChange={handleInputChange}
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
                                  value={data["bio"]}
                                  onChange={(e) => {
                                      handleInputChange(e)
                                      setIsBioChanged(true);
                                  }}
                                  style={{overflow: 'hidden'}}
                        />
                    </div>
                    <span className="about">Какие-нибудь подробности о вас</span>
                </div>
            </form>
        </div>
    );
}
