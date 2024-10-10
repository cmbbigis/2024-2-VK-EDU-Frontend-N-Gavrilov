import { loadChats } from "./createChatModal.js";

export function createChatList() {
    const chatList = document.createElement('div');
    chatList.className = 'chat-list';

    loadChats(chatList);

    return chatList;
}