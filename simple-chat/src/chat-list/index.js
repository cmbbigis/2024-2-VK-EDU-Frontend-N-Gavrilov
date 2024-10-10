import { createChatListHeader } from '../components/chat-list/chatListHeader.js';

document.addEventListener('DOMContentLoaded', () => {
    const app = document.getElementById('app');

    const chatListHeader = createChatListHeader();

    app.appendChild(chatListHeader);
});
