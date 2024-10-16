export function createChat(chatId, interlocutor, avatarFile) {
    const chatLink = document.createElement('a');
    chatLink.className = 'chat-link';
    chatLink.href = `./chat.html?id=${chatId}`;

    const chat = document.createElement('div');
    chat.className = 'chat';

    const avatar = document.createElement('img');
    avatar.className = 'avatar';
    avatar.alt = 'Avatar';
    avatar.src = avatarFile

    const lastMessage = gelLastMessage(chatId) || {text: '', time: ''};

    const chatInfo = document.createElement('div');
    chatInfo.className = 'chat-info';
    const chatTitle = document.createElement('h2');
    chatTitle.className = 'chat-title';
    chatTitle.innerText = interlocutor;
    const chatLastMessage = document.createElement('p');
    chatLastMessage.className = 'chat-last-message';
    chatLastMessage.innerText = lastMessage.text;

    const chatMeta = document.createElement('div');
    chatMeta.className = 'chat-meta';
    const lastMessageTime = document.createElement('span');
    lastMessageTime.className = 'last-message-time';
    lastMessageTime.innerText = lastMessage.time;
    const status = document.createElement('span');
    status.className = 'material-symbols-outlined';
    status.innerText = 'done_all';

    chatInfo.appendChild(chatTitle);
    chatInfo.appendChild(chatLastMessage);

    chatMeta.appendChild(lastMessageTime);
    chatMeta.appendChild(status);

    chat.appendChild(avatar);
    chat.appendChild(chatInfo);
    chat.appendChild(chatMeta);

    chatLink.appendChild(chat);

    return chatLink;

    function gelLastMessage(chatId) {
        const messages = JSON.parse(localStorage.getItem('messages')) || [];
        const filteredMessages = messages.filter(message => message.chatId === chatId) || [];
        return  filteredMessages[filteredMessages.length - 1];
    }
}