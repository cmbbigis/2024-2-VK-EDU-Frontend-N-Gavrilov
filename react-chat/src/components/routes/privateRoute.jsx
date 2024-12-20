import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

export const PrivateRoute = ({ children }) => {
    const isAuthorized = useSelector((state) => state.slice.isAuthorized) || JSON.parse(sessionStorage.getItem('isAuthorized'));

    return isAuthorized ? children : <Navigate to="/" />;
};