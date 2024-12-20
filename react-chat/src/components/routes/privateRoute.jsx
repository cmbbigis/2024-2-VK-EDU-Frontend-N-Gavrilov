import {useNavigate} from 'react-router-dom';
import { useSelector } from 'react-redux';
import {useEffect} from "react";

export const PrivateRoute = ({ children }) => {
    const isAuthorized = useSelector((state) => state.slice.isAuthorized) || JSON.parse(sessionStorage.getItem('isAuthorized'));
    const navigate = useNavigate();

    useEffect(() => {
        if (!isAuthorized) {
            navigate('/');
        }
    }, [isAuthorized, navigate]);

    return (isAuthorized && children);
};