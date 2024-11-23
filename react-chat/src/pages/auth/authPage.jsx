import React from "react";
import { useNavigate } from "react-router-dom";
import { BackendHttpClient } from "../../utils/backendHttpClient";

export const AuthPage = () => {
    const navigate = useNavigate();
    async function onSubmit() {
        const response = await BackendHttpClient.auth(new FormData(document.getElementById("authForm")));
        localStorage.setItem("access", response["access"]);
        localStorage.setItem("refresh", response["refresh"]);
        const currentUser = await BackendHttpClient.getUser('current');
        localStorage.setItem("currentUser", JSON.stringify(currentUser));
        navigate("/");
    }

    return (
        <div className="authPage">
            <form id="authForm" encType="multipart/form-data">
                <label htmlFor="loginInput">Логин</label>
                <input
                    type="text"
                    className="usernameInput"
                    name="username"
                />
                <label htmlFor="passwordInput">Пароль</label>
                <input
                    type="text"
                    className="passwordInput"
                    name="password"
                />
                <button type="button" className="loginButton" onClick={onSubmit}>Войти</button>
            </form>
            <button onClick={() => navigate("/register/")}>Нет аккаунта? Зарегистрироваться</button>
        </div>
    );
}