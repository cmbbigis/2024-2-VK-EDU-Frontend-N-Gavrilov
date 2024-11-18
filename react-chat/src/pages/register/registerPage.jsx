import React from "react";
import { useNavigate } from "react-router-dom";

export const RegisterPage = () => {
    const navigate = useNavigate();
    return (
        <div className="registerPage">
            <button className="back-to-auth" onClick={() => navigate("/auth/")}>Назад к авторизации</button>
            <form action="https://vkedu-fullstack-div2.ru/api/register/">
                <label htmlFor="loginInput">Логин</label>
                <input
                    type="text"
                    className="loginInput"
                    name="loginInput"
                />
                <label htmlFor="passwordInput">Пароль</label>
                <input
                    type="text"
                    className="passwordInput"
                    name="passwordInput"
                />
                <button type="submit" className="registerButton">Зарегистрироваться</button>
            </form>
        </div>
    );
}