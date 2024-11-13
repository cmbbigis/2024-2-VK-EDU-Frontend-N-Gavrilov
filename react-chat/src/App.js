import React, { useState } from 'react';

import './App.scss';
import { ChatListPage } from './pages';
import { ChatPage } from './pages';

function App() {
  const [currentPage, setCurrentPage] = useState('chatList');
  const [selectedChatId, setSelectedChatId] = useState(null);

  const handleSelectChat = (chatId) => {
    setSelectedChatId(chatId);
    setCurrentPage('chat');
  };

  const handleBackToChatList = () => {
    setCurrentPage('chatList');
  };

  return (
      <div id="app" className="App">
        {currentPage === 'chatList' && <ChatListPage onSelectChat={handleSelectChat} />}
        {currentPage === 'chat' && <ChatPage chatId={selectedChatId} onBack={handleBackToChatList} />}
      </div>
  );
}

export default App;
