import React, { useState } from 'react';

import './chatListPage.scss';
import { ChatListHeader, ChatList, CreateChatButton, CreateChatModal } from '../../components/chat-list';

export const ChatListPage = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [reload, setReload] = useState(false);

    const handleOpenModal = () => setIsModalOpen(true);
    const handleCloseModal = () => setIsModalOpen(false);
    const handleChatCreated = () => {
        setIsModalOpen(false);
        setReload(!reload);
    };

    return (
        <div id="chatListPage">
            <ChatListHeader />
            <ChatList reload={reload} />
            <CreateChatButton onClick={handleOpenModal} />
            {isModalOpen && <CreateChatModal onClose={handleCloseModal} onChatCreated={handleChatCreated}/>}
        </div>
    );
}
