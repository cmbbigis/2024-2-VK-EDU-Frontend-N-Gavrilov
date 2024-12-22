import {Navigate, useNavigate} from 'react-router-dom';
import { useSelector } from 'react-redux';
import React, {useEffect} from "react";
import PropTypes from "prop-types";

export const PrivateRoute = ({ children }) => {
    const isAuthorized = useSelector((state) => state.slice.isAuthorized) || JSON.parse(sessionStorage.getItem('isAuthorized'));
    const navigate = useNavigate();

    useEffect(() => {
        if (!isAuthorized) {
            navigate('/');
        }
    }, [isAuthorized, navigate]);

    return isAuthorized ? children : <Navigate to="/" />;
};

PrivateRoute.propTypes = {
    children: PropTypes.element.isRequired
};
