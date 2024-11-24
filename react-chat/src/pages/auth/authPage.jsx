import React from "react";
import { useNavigate } from "react-router-dom";
import { BackendClient } from "../../utils/backendClient";

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
        navigate("/");
    }

    return (
        <div className="authPage">
            <form id="authForm" encType="multipart/form-data" onSubmit={onSubmit}>
                <label htmlFor="loginInput">Логин</label>
                <input
                    type="text"
                    className="usernameInput"
                    name="username"
                    required
                />
                <label htmlFor="passwordInput">Пароль</label>
                <input
                    type="text"
                    className="passwordInput"
                    name="password"
                    required
                />
                <button type='submit' className="loginButton">Войти</button>
            </form>
            <button onClick={() => navigate("/register/")}>Нет аккаунта? Зарегистрироваться</button>
        </div>
    );
}