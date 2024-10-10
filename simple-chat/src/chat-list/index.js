import { createChatListHeader } from '../components/chat-list/chatListHeader.js';
import { createChatList } from '../components/chat-list/chatList.js';
import { createChat } from '../components/chat-list/chat.js';

document.addEventListener('DOMContentLoaded', () => {
    const app = document.getElementById('app');

    const chatListHeader = createChatListHeader();
    const chatList = createChatList();
    const chat = createChat();

    chatList.appendChild(chat);

    app.appendChild(chatListHeader);
    app.appendChild(chatList);
});
