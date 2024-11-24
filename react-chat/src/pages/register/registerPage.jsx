import React from "react";
import { useNavigate } from "react-router-dom";
import { BackendClient } from "../../utils/backendClient";

export const RegisterPage = () => {
    const navigate = useNavigate();

    async function onSubmit(event) {
        event.preventDefault();

        const form = event.target;
        if (!form.checkValidity()) {
            form.reportValidity();
            return;
        }

        const response = await BackendClient.register(new FormData(document.getElementById("registerForm")));
        if (!response) {
            return;
        }
        navigate("/auth/");
    }

    return (
        <div className="registerPage">
            <button className="back-to-auth" onClick={() => navigate("/auth/")}>Назад к авторизации</button>
            <form id="registerForm" encType="multipart/form-data" onSubmit={onSubmit}>
                <label htmlFor="login">Логин</label>
                <input
                    type="text"
                    className="usernameInput"
                    name="username"
                    required
                />
                <label htmlFor="password">Пароль</label>
                <input
                    type="text"
                    className="passwordInput"
                    name="password"
                    required
                />
                <label htmlFor="first_name">имя</label>
                <input
                    type="text"
                    className="firstNameInput"
                    name="first_name"
                    required
                />
                <label htmlFor="last_name">фамилия</label>
                <input
                    type="text"
                    className="lastNameInput"
                    name="last_name"
                    required
                />
                <label htmlFor="bio">био</label>
                <input
                    type="text"
                    className="bioInput"
                    name="bio"
                />
                <button
                    type='submit'
                    className="registerButton"
                >
                    Зарегистрироваться
                </button>
            </form>
        </div>
    );
}