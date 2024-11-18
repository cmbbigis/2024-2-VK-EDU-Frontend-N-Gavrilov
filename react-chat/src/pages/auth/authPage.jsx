import React from "react";
import { useNavigate } from "react-router-dom";

export const AuthPage = () => {
    const navigate = useNavigate();
    return (
        <div className="authPage">
            <form action="https://vkedu-fullstack-div2.ru/api/auth/">
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
                <button type="submit" className="loginButton">Войти</button>
            </form>
            <button onClick={() => navigate("/register/")}>Нет аккаунта? Зарегистрироваться</button>
        </div>
    );
}