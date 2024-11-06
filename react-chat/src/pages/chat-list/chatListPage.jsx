import React, { useState } from 'react';

import './chatListPage.scss';
import { ChatListHeader, ChatList, CreateChatButton, CreateChatModal } from '../../components/chat-list';

export const ChatListPage = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleOpenModal = () => setIsModalOpen(true);
    const handleCloseModal = () => setIsModalOpen(false);

    return (
        <div id="app">
            <ChatListHeader />
            <ChatList />
            <CreateChatButton onClick={handleOpenModal} />
            {isModalOpen && <CreateChatModal onClose={handleCloseModal} />}
        </div>
    );
}
