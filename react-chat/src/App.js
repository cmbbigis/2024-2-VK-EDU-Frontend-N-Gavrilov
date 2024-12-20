import {HashRouter, Route, Routes, useLocation} from 'react-router-dom';

import './App.scss';
import {AuthPage, ChatListPage, ChatPage, EditProfilePage, NotFoundPage, ProfilePage, RegisterPage} from './pages';
import {Bounce, toast, ToastContainer} from "react-toastify";
import {useEffect, useRef, useState} from "react";
import {Centrifugo} from "./utils/Centrifugo";
import {Provider, useDispatch, useSelector} from "react-redux";
import {store} from "./redux/store";
import {setCurrentChatId} from "./redux/slice";

function App() {
    return (
        <Provider store={store}>
            <div className="App">
                <HashRouter future={{ v7_startTransition: true }}>
                    <AppRoutes />
                </HashRouter>
                <ToastContainer
                    position="bottom-right"
                    autoClose={5000}
                    hideProgressBar={false}
                    newestOnTop={false}
                    closeOnClick
                    rtl={false}
                    pauseOnFocusLoss
                    pauseOnHover
                    theme="light"
                    transition={Bounce}
                />
            </div>
        </Provider>
    );
}

function AppRoutes() {
    const location = useLocation();
    const dispatch = useDispatch();
    const [messageToNotify, setMessageToNotify] = useState(null);
    const centrifugoRef = useRef(null);
    const { currentChatId, currentUser } = useSelector((state) => state.slice)

    useEffect(() => {
        if (!location.pathname.includes('/chat/')) {
            dispatch(setCurrentChatId(null));
        }
    }, [location, dispatch]);

    useEffect(() => {
        centrifugoRef.current = Centrifugo(currentChatId, null, null, null, setMessageToNotify);
        return () => centrifugoRef.current;
    }, [currentChatId]);

    useEffect(() => {
        if (messageToNotify && messageToNotify.chat !== currentChatId && messageToNotify.sender.id !== currentUser.id) {
            toast.info(`Новое сообщение от ${messageToNotify.sender.first_name} ${messageToNotify.sender.last_name}`);
            setMessageToNotify(null);
        }
    }, [messageToNotify, currentChatId, currentUser]);

    return (
        <Routes>
            <Route path='/chat/:chatId' Component={ChatPage}/>
            <Route path='/chats/' Component={ChatListPage}/>
            <Route path='/' Component={AuthPage}/>
            <Route path='/register/' Component={RegisterPage}/>
            <Route path='/profile/' Component={ProfilePage}/>
            <Route path='/editProfile/' Component={EditProfilePage}/>
            <Route path='*' Component={NotFoundPage}/>
        </Routes>
    );
}


export default App;
