export function createChatScreen(chatId) {
    const chatScreen = document.createElement('div');
    chatScreen.className = 'chat-screen';

    const messagesContainer = document.createElement('div');
    messagesContainer.className = 'messages';

    const form = document.createElement('form');
    form.className = 'form';

    const messageInputContainer = document.createElement('label');
    messageInputContainer.className = 'message-input-container';

    const messageInput = document.createElement('input');
    messageInput.className = 'message-input';
    messageInput.name = 'message-text';
    messageInput.placeholder = 'Сообщение';
    messageInput.type = 'text';

    messageInputContainer.appendChild(messageInput);
    form.appendChild(messagesContainer);
    form.appendChild(messageInputContainer);

    form.addEventListener('submit', handleSubmit);

    loadMessages(chatId, messagesContainer);

    chatScreen.appendChild(messagesContainer);
    chatScreen.appendChild(form);

    return chatScreen;

    function handleSubmit(event) {
        event.preventDefault();
        const text = messageInput.value.trim();
        const sender = 'Я';
        if (text) {
            saveMessage(chatId, text, sender);
            loadMessages(chatId, messagesContainer);
            messageInput.value = '';
            messagesContainer.scrollTop = messagesContainer.scrollHeight;
        }
    }

    function loadMessages(chatId, container) {
        const messages = JSON.parse(localStorage.getItem('messages')) || [];
        const filteredMessages = messages.filter(message => message.chatId === chatId) || [];
        container.innerHTML = '';
        filteredMessages.forEach(({ text, sender, time }) => {
            const messageDiv = document.createElement('div');
            messageDiv.classList.add('message');
            messageDiv.classList.add(sender === 'Я' ? 'my-message' : 'interlocutor-message');
            messageDiv.innerHTML = `<strong>${sender}</strong> (<em>${time}</em>):<br>${text}`;
            container.appendChild(messageDiv);
        });
    }

    function saveMessage(chatId, text, sender) {
        const messages = JSON.parse(localStorage.getItem('messages')) || [];
        const time = new Date().toLocaleString();
        messages.push({ chatId, text, sender, time });
        localStorage.setItem('messages', JSON.stringify(messages));
    }
}
