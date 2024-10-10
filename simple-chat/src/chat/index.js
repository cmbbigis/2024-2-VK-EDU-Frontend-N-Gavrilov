import { createChatHeader } from '../components/chat/header.js';
import { createChatScreen } from '../components/chat/chatScreen.js';

document.addEventListener('DOMContentLoaded', () => {
    const app = document.getElementById('app');

    const chatHeader = createChatHeader();
    const chatScreen = createChatScreen();

    app.appendChild(chatHeader);
    app.appendChild(chatScreen);
});
