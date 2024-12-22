import {Navigate, Route, Routes, useLocation} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {useEffect, useRef, useState} from "react";
import {setCurrentChatId} from "../../redux/slice";
import {Centrifugo} from "../../utils/Centrifugo";
import {toast} from "react-toastify";
import {AuthPage, ChatListPage, ChatPage, EditProfilePage, NotFoundPage, ProfilePage, RegisterPage} from "../../pages";
import {PrivateRoute} from "./privateRoute";

export function AppRoutes() {
    const location = useLocation();
    const dispatch = useDispatch();
    const [messageToNotify, setMessageToNotify] = useState(null);
    const centrifugoRef = useRef(null);
    const { currentChatId, currentUser, isAuthorized } = useSelector((state) => state.slice)

    useEffect(() => {
        if (!location.pathname.includes('/chat/')) {
            dispatch(setCurrentChatId(null));
        }
    }, [location, dispatch]);

    useEffect(() => {
        if (currentUser) {
            centrifugoRef.current = Centrifugo(currentChatId, null, null, null, setMessageToNotify);
            return () => centrifugoRef.current;
        }
    }, [currentChatId, currentUser]);

    useEffect(() => {
        if (messageToNotify && messageToNotify.chat !== currentChatId && messageToNotify.sender.id !== currentUser.id) {
            toast.info(`Новое сообщение от ${messageToNotify.sender.first_name} ${messageToNotify.sender.last_name}`);
            setMessageToNotify(null);
        }
    }, [messageToNotify, currentChatId, currentUser]);

    return (
        <Routes>
            <Route path='/chat/:chatId' element={<PrivateRoute><ChatPage /></PrivateRoute>}/>
            <Route path='/chats/' element={<PrivateRoute><ChatListPage /></PrivateRoute>}/>
            <Route path='/' element={
                isAuthorized || JSON.parse(sessionStorage.getItem('isAuthorized'))
                ? <Navigate to="/chats/" />
                : <AuthPage />
            }/>
            <Route path='/register/' element={
                isAuthorized || JSON.parse(sessionStorage.getItem('isAuthorized'))
                    ? <Navigate to="/chats/" />
                    : <RegisterPage />
            }/>
            <Route path='/profile/' element={<PrivateRoute><ProfilePage /></PrivateRoute>}/>
            <Route path='/editProfile/' element={<PrivateRoute><EditProfilePage /></PrivateRoute>}/>
            <Route path='*' Component={NotFoundPage}/>
        </Routes>
    );
}