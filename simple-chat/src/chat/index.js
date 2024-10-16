import './index.css';
import '../components/chat/header.css';
import '../components/chat/chatScreen.css';

import { createChatHeader } from '../components/chat/header.js';
import { createChatScreen } from '../components/chat/chatScreen.js';

document.addEventListener('DOMContentLoaded', () => {
    const app = document.getElementById('app');
    const params = new URLSearchParams(window.location.search);
    const chatId = +params.get('id');

    const chatHeader = createChatHeader(chatId);
    const chatScreen = createChatScreen(chatId);

    app.appendChild(chatHeader);
    app.appendChild(chatScreen);
});
