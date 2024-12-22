import {Navigate, useNavigate} from 'react-router-dom';
import { useSelector } from 'react-redux';
import React, {useEffect} from "react";
import PropTypes from "prop-types";

export const PublicRoute = ({ children }) => {
    const isAuthorized = useSelector((state) => state.slice.isAuthorized) || JSON.parse(sessionStorage.getItem('isAuthorized'));
    const navigate = useNavigate();

    useEffect(() => {
        if (isAuthorized) {
            navigate('/chats/');
        }
    }, [isAuthorized, navigate]);

    return isAuthorized ? <Navigate to="/chats/" /> : children;
};

PublicRoute.propTypes = {
    children: PropTypes.element.isRequired
};
