import { HashRouter, Route, Routes } from 'react-router-dom';

import './App.scss';
import {AuthPage, ChatListPage, ChatPage, EditProfilePage, NotFoundPage, ProfilePage, RegisterPage} from './pages';
import {ToastContainer, Bounce} from "react-toastify";

function App() {
    return (
        <div className="App">
            <HashRouter future={{ v7_startTransition: true }}>
                <Routes>
                    <Route path='/chat/:chatId' Component={ChatPage}/>
                    <Route path='/chats/' Component={ChatListPage}/>
                    <Route path='/' Component={AuthPage}/>
                    <Route path='/register/' Component={RegisterPage}/>
                    <Route path='/profile/' Component={ProfilePage}/>
                    <Route path='/editProfile/' Component={EditProfilePage}/>
                    <Route path='*' Component={NotFoundPage}/>
                </Routes>
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
    );
}

export default App;
