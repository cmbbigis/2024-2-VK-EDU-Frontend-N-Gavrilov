import React, {useState} from "react";
import { useNavigate } from "react-router-dom";
import { BackendClient } from "../../utils/backendClient";

import './authPage.scss';
import {useDispatch} from "react-redux";
import {login, setCurrentUser} from "../../redux/slice";

export const AuthPage = () => {
    const navigate = useNavigate();
    const [errors, setErrors] = useState({});
    const dispatch = useDispatch();

    const handleInputChange = (event) => {
        const name = event.target.name;

        setErrors((prev) => ({ ...prev, [name]: '' }));
    };

    async function onSubmit(event) {
        event.preventDefault();

        const form = event.target;
        if (!form.checkValidity()) {
            form.reportValidity();
            return;
        }

        try {
            const response = await BackendClient.auth(new FormData(document.getElementById("authForm")));
            if (!response) {
                return;
            }
            localStorage.setItem("access", response["access"]);
            localStorage.setItem("refresh", response["refresh"]);
            const currentUser = await BackendClient.getUser('current');
            dispatch(setCurrentUser(currentUser));
            dispatch(login());
            navigate("/chats/");
        } catch (error) {
            setErrors(error);
        }
    }

    return (
        <div className="authPage">
            <form className="authForm" id="authForm" encType="multipart/form-data" onSubmit={onSubmit}>
                <h1 className="messengerLabel">Messenger</h1>
                <div className="errorContainer">
                    <div className="formInput">
                        <label htmlFor="loginInput">Логин</label>
                        <input
                            type="text"
                            className="usernameInput"
                            name="username"
                            onChange={handleInputChange}
                            required
                        />
                    </div>
                    {errors["username"] &&
                        <div className="error" style={{maxWidth: "175px"}}>{errors["username"]}</div>}
                </div>

                <div className="errorContainer">
                    <div className="formInput">
                        <label htmlFor="passwordInput">Пароль</label>
                        <input
                            type="password"
                            className="passwordInput"
                            name="password"
                            onChange={handleInputChange}
                            required
                        />
                    </div>
                    {errors["password"] &&
                        <div className="error" style={{maxWidth: "175px"}}>{errors["password"]}</div>}
                </div>

                <button type='submit' className="loginButton">Войти</button>

                <div className="registerButtonContainer">
                    <label className="registerButtonLabel" htmlFor="registerButton">Нет аккаунта?</label>
                    <button className="registerButton" type='button' onClick={() => navigate("/register/")}>Зарегистрироваться</button>
                </div>
            </form>
        </div>
    );
}