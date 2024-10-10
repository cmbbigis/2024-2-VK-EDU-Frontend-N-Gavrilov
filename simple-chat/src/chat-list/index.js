import { createChatListHeader } from '../components/chat-list/header.js';
import { createChatList } from '../components/chat-list/chatList.js';
import { createChat } from '../components/chat-list/chat.js';
import { createCreateChatButton } from '../components/chat-list/createChatButton.js';

document.addEventListener('DOMContentLoaded', () => {
    const app = document.getElementById('app');

    const chatListHeader = createChatListHeader();
    const chatList = createChatList();
    const chat = createChat();
    const createChatButton = createCreateChatButton();

    chatList.appendChild(chat);

    app.appendChild(chatListHeader);
    app.appendChild(chatList);
    app.appendChild(createChatButton);
});
