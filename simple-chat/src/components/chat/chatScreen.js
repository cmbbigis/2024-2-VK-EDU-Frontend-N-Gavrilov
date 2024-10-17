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

    const attachFile = document.createElement('span');
    attachFile.className = 'material-symbols-outlined';
    attachFile.textContent = 'attach_file';

    const sendButton = document.createElement('span');
    sendButton.className = 'material-symbols-outlined send-button';
    sendButton.type = 'submit';
    sendButton.style.display = 'none';
    sendButton.textContent = 'send';
    sendButton.onclick = () => { form.requestSubmit(); };

    messageInputContainer.appendChild(messageInput);
    messageInputContainer.appendChild(attachFile);
    messageInputContainer.appendChild(sendButton);
    form.appendChild(messagesContainer);
    form.appendChild(messageInputContainer);

    form.addEventListener('submit', handleSubmit);
    messageInput.addEventListener('input', handleInput);

    loadMessages(chatId, messagesContainer, true);

    chatScreen.appendChild(messagesContainer);
    chatScreen.appendChild(form);

    return chatScreen;

    function handleInput() {
        if (messageInput.value.trim()) {
            sendButton.style.display = 'block';
        } else {
            sendButton.style.display = 'none';
        }
    }

    function handleSubmit(event) {
        event.preventDefault();
        const text = messageInput.value.trim();
        const sender = 'Я';
        if (text) {
            saveMessage(chatId, text, sender);
            loadMessages(chatId, messagesContainer, false);
            messageInput.value = '';
            sendButton.style.display = 'none';
            messagesContainer.scrollTop = messagesContainer.scrollHeight;
        }
    }

    function loadMessages(chatId, container, initialLoad) {
        const messages = JSON.parse(localStorage.getItem('messages')) || [];
        const filteredMessages = messages.filter(message => message.chatId === chatId) || [];
        container.innerHTML = '';
        filteredMessages.forEach(({ text, sender, time }, index) => {
            const messageDiv = document.createElement('div');
            messageDiv.classList.add('message');
            messageDiv.classList.add(sender === 'Я' ? 'my-message' : 'interlocutor-message');
            if (initialLoad) {
                messageDiv.classList.add('new-message');
            } else if (index === filteredMessages.length - 1) {
                messageDiv.classList.add('new-message');
            }
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
