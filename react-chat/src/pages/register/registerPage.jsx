import React, {useState} from "react";
import { useNavigate } from "react-router-dom";
import BackendClient from "../../utils/BackendClient";

import './registerPage.scss';

export const RegisterPage = () => {
    const navigate = useNavigate();
    const [errors, setErrors] = useState({});

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
            const formData = new FormData(document.getElementById("registerForm"));
            const request = {
                username: `${formData.get('username')}`,
                password: `${formData.get('password')}`,
                first_name: `${formData.get('first_name')}`,
                last_name: `${formData.get('last_name')}`,
            }

            await BackendClient.register(request);
            navigate("/");
        } catch (error) {
            setErrors(error);
        }
    }

    return (
        <div className="registerPage">
            <form className="registerForm" id="registerForm" encType="multipart/form-data" onSubmit={onSubmit}>
                <h1 className="registerLabel">Регистрация</h1>
                <div className="errorContainer">
                    <div className="formInput">
                        <label htmlFor="login">Логин</label>
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
                        <label htmlFor="password">Пароль</label>
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

                <div className="errorContainer">
                    <div className="formInput">
                        <label htmlFor="first_name">Имя</label>
                        <input
                            type="text"
                            className="firstNameInput"
                            name="first_name"
                            onChange={handleInputChange}
                            required
                        />
                    </div>
                    {errors["first_name"] &&
                        <div className="error" style={{maxWidth: "175px"}}>{errors["first_name"]}</div>}
                </div>

                <div className="errorContainer">
                    <div className="formInput">
                        <label htmlFor="last_name">Фамилия</label>
                        <input
                            type="text"
                            className="lastNameInput"
                            name="last_name"
                            onChange={handleInputChange}
                            required
                        />
                    </div>
                    {errors["last_name"] &&
                        <div className="error" style={{maxWidth: "175px"}}>{errors["last_name"]}</div>}
                </div>

                <button
                    type='submit'
                    className="registerButton"
                >
                    Зарегистрироваться
                </button>


                <div className="backToAuthButtonContainer">
                    <label className="backToAuthButtonLabel" htmlFor="backToAuth">Уже есть аккаунт?</label>
                    <button className="backToAuth" type='button' onClick={() => navigate("/")}>Авторизация</button>
                </div>

            </form>
        </div>
    );
}