import './index.css';
import '../components/chat-list/header.js';
import '../components/chat-list/chatList.js';
import '../components/chat-list/createChatButton.js';
import '../components/chat-list/createChatModal.js';

import { createChatListHeader } from '../components/chat-list/header.js';
import { createChatList } from '../components/chat-list/chatList.js';
import { createCreateChatButton } from '../components/chat-list/createChatButton.js';
import { createModal } from '../components/chat-list/createChatModal.js';

document.addEventListener('DOMContentLoaded', () => {
    const app = document.getElementById('app');

    const chatListHeader = createChatListHeader();
    const chatList = createChatList();
    const createChatButton = createCreateChatButton();
    const createChatModal = createModal();

    app.appendChild(chatListHeader);
    app.appendChild(chatList);
    app.appendChild(createChatButton);
    app.appendChild(createChatModal);
});
