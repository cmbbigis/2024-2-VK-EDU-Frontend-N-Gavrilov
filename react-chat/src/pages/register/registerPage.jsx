import React, {useState} from "react";
import { useNavigate } from "react-router-dom";
import { BackendClient } from "../../utils/backendClient";

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
            await BackendClient.register(new FormData(document.getElementById("registerForm")));
            navigate("/");
        } catch (error) {
            setErrors(error);
        }
    }

    return (
        <div className="registerPage">
            <button className="back-to-auth" onClick={() => navigate("/")}>Назад к авторизации</button>
            <form className="registerForm" id="registerForm" encType="multipart/form-data" onSubmit={onSubmit}>
                <div>
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
                    {errors["username"] && <div className="error" style={{ maxWidth: "175px" }}>{errors["username"]}</div>}
                </div>

                <div>
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
                    {errors["password"] && <div className="error" style={{ maxWidth: "175px" }}>{errors["password"]}</div>}
                </div>

                <div>
                    <div className="formInput">
                        <label htmlFor="first_name">имя</label>
                        <input
                            type="text"
                            className="firstNameInput"
                            name="first_name"
                            onChange={handleInputChange}
                            required
                        />
                    </div>
                    {errors["first_name"] && <div className="error" style={{ maxWidth: "175px" }}>{errors["first_name"]}</div>}
                </div>

                <div>
                    <div className="formInput">
                        <label htmlFor="last_name">фамилия</label>
                        <input
                            type="text"
                            className="lastNameInput"
                            name="last_name"
                            onChange={handleInputChange}
                            required
                        />
                    </div>
                    {errors["last_name"] && <div className="error" style={{ maxWidth: "175px" }}>{errors["last_name"]}</div>}
                </div>

                <div>
                    <div className="formInput">
                        <label htmlFor="bio">био</label>
                        <input
                            type="text"
                            className="bioInput"
                            name="bio"
                            onChange={handleInputChange}
                        />
                    </div>
                    {errors["bio"] && <div className="error" style={{ maxWidth: "175px" }}>{errors["bio"]}</div>}
                </div>

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