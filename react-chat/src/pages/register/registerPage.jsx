import React from "react";
import { useNavigate } from "react-router-dom";
import { BackendHttpClient } from "../../utils/backendHttpClient";

export const RegisterPage = () => {
    const navigate = useNavigate();

    async function onSubmit() {
        BackendHttpClient.register(document.getElementById("registerForm"))
            .then((response) => {
                navigate("/auth/");
                return response.json();
            })
            .catch((err) => {
                alert(err);
            })
    }

    return (
        <div className="registerPage">
            <button className="back-to-auth" onClick={() => navigate("/auth/")}>Назад к авторизации</button>
            <form id="registerForm" action="api/register/">
                <label htmlFor="login">Логин</label>
                <input
                    type="text"
                    className="usernameInput"
                    name="username"
                />
                <label htmlFor="password">Пароль</label>
                <input
                    type="text"
                    className="passwordInput"
                    name="password"
                />
                <label htmlFor="first_name">имя</label>
                <input
                    type="text"
                    className="firstNameInput"
                    name="first_name"
                />
                <label htmlFor="last_name">фамилия</label>
                <input
                    type="text"
                    className="lastNameInput"
                    name="last_name"
                />
                <label htmlFor="bio">био</label>
                <input
                    type="text"
                    className="bioInput"
                    name="bio"
                />
                <button
                    type="button"
                    onClick={onSubmit}
                    className="registerButton"
                >
                    Зарегистрироваться
                </button>
            </form>
        </div>
    );
}