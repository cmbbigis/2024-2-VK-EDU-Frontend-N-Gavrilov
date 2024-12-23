import React, {useEffect, useRef, useState} from 'react';
import { useNavigate } from 'react-router-dom';
import PhotoCameraIcon from "@mui/icons-material/PhotoCamera";

import './editProfilePage.scss';
import { EditProfileHeader } from "../../components/editProfile";
import {BackendClient} from "../../utils/backendClient";
import {useDispatch, useSelector} from "react-redux";
import {setCurrentUser} from "../../redux/slice";

export const EditProfilePage = () => {
    const dispatch = useDispatch();
    const { currentUser } = useSelector((state) => state.slice)
    const [isBioChanged, setIsBioChanged] = useState(false);
    const [errors, setErrors] = useState({});

    const [data, setData] = useState({
        "first_name": currentUser?.first_name || '',
        "last_name": currentUser?.last_name || '',
        "username": currentUser?.username || '',
        "bio": currentUser?.bio || '',
        "avatar": currentUser?.avatar || null
    });

    const handleInputChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;

        setValue(value);
        setData((prev) => ({ ...prev, [name]: value }));
        setErrors((prev) => ({ ...prev, [name]: '' }));
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

        formData.set('first_name', data["first_name"]);

        formData.set('last_name', data["last_name"]);

        formData.set('username', data["username"]);

        if (isBioChanged) {
            formData.set('bio', data["bio"]);
        }

        try {
            const currentUserInfo = await BackendClient.editProfile(currentUser['id'], formData);
            currentUser['avatar'] = currentUserInfo["avatar"];
            currentUser['first_name'] = currentUserInfo["first_name"];
            currentUser['last_name'] = currentUserInfo["last_name"];
            currentUser['username'] = currentUserInfo["username"];
            currentUser['bio'] = currentUserInfo["bio"];
            dispatch(setCurrentUser(currentUser));

            navigate('/profile/');
        } catch (error) {
            setErrors(error);
        }
    }

    return (
        <div className="editProfilePage">
            <EditProfileHeader onSave={handleSave}/>
            <form className="edit-profile-info" id="edit-profile-form" encType="multipart/form-data">
                <div>
                    <div className="profile-avatar-input-container" onClick={handleImageClick}>
                        <img className="profile-avatar-input"
                             alt="Avatar"
                             src={data["avatarURL"] || currentUser['avatar']}
                        />
                        <span className="overlay"><PhotoCameraIcon/></span>
                        <input
                            type="file"
                            accept="image/*"
                            ref={fileInputRef}
                            style={{display: 'none'}}
                            name="avatar"
                            onChange={handleFileChange}
                        />
                    </div>
                    {errors["avatar"] && <div className="error" style={{ maxWidth: "250px" }}>{errors["avatar"]}</div>}
                </div>

                <div>
                    <div className="container profile-first-name-input">
                        <label className="info-label" htmlFor="profile-first-name">Имя</label>
                        <input className="info-input profile-first-name-input"
                               name="first_name"
                               type="text"
                               value={data["first_name"]}
                               onChange={handleInputChange}
                               required
                        />
                    </div>
                    {errors["first_name"] && <div className="error" style={{ maxWidth: "250px" }}>{errors["first_name"]}</div>}
                </div>

                <div>
                    <div className="container profile-last-name-input">
                        <label className="info-label" htmlFor="profile-last-name">Фамилия</label>
                        <input className="info-input profile-last-name-input"
                               name="last_name"
                               type="text"
                               value={data["last_name"]}
                               onChange={handleInputChange}
                               required
                        />
                    </div>
                    {errors["last_name"] && <div className="error" style={{ maxWidth: "250px" }}>{errors["last_name"]}</div>}
                </div>

                <div>
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
                    {errors["username"] && <div className="error" style={{ maxWidth: "250px" }}>{errors["username"]}</div>}
                </div>
                <div>
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
                    {errors["bio"] && <div className="error" style={{ maxWidth: "250px" }}>{errors["bio"]}</div>}
                </div>
            </form>
        </div>
    );
}
