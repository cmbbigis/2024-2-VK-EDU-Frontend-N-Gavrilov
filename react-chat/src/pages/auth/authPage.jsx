import React from "react";
import { useNavigate } from "react-router-dom";
import { BackendClient } from "../../utils/backendClient";

import './authPage.scss';

export const AuthPage = () => {
    const navigate = useNavigate();
    async function onSubmit(event) {
        event.preventDefault();

        const form = event.target;
        if (!form.checkValidity()) {
            form.reportValidity();
            return;
        }

        const response = await BackendClient.auth(new FormData(document.getElementById("authForm")));
        if (!response) {
            return;
        }
        localStorage.setItem("access", response["access"]);
        localStorage.setItem("refresh", response["refresh"]);
        const currentUser = await BackendClient.getUser('current');
        localStorage.setItem("currentUser", JSON.stringify(currentUser));
        navigate("/chats/");
    }

    return (
        <div className="authPage">
            <form className="authForm" id="authForm" encType="multipart/form-data" onSubmit={onSubmit}>
                <div className="formInput">
                    <label htmlFor="loginInput">Логин</label>
                    <input
                        type="text"
                        className="usernameInput"
                        name="username"
                        required
                    />
                </div>

                <div className="formInput">
                    <label htmlFor="passwordInput">Пароль</label>
                    <input
                        type="password"
                        className="passwordInput"
                        name="password"
                        required
                    />
                </div>

                <button type='submit' className="loginButton">Войти</button>
            </form>
            <button onClick={() => navigate("/register/")}>Нет аккаунта? Зарегистрироваться</button>
        </div>
    );
}