import React from "react";
import { useNavigate } from "react-router-dom";
import { BackendHttpClient } from "../../utils/backendHttpClient";

export const AuthPage = () => {
    async function onSubmit() {
        BackendHttpClient.auth(document.getElementById("authForm"))
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Error occurred!');
                }
                navigate("/");
                return response.json();
            })
            .catch((err) => {
                alert(err);
            })
    }

    const navigate = useNavigate();
    return (
        <div className="authPage">
            <form id="authForm" action="/api/auth/" method="post" encType="multipart/form-data">
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