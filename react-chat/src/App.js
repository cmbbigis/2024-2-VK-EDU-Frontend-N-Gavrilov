import { HashRouter, Route, Routes } from 'react-router-dom';

import './App.scss';
import {ChatListPage, ChatPage, EditProfilePage, ProfilePage} from './pages';

function App() {
  return (
      <HashRouter future={{ v7_startTransition: true }}>
        <Routes>
          <Route path='/chat/:chatId' Component={ChatPage}/>
          <Route path='/' Component={ChatListPage}/>
          <Route path='/profile/' Component={ProfilePage}/>
          <Route path='/editProfile/' Component={EditProfilePage}/>
        </Routes>
      </HashRouter>
  );
}

export default App;
