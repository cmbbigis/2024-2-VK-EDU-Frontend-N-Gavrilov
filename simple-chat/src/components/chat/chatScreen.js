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

    const attachFileButton = document.createElement('button');
    attachFileButton.className = 'footer-button attach-file-button';

    const attachFile = document.createElement('span');
    attachFile.className = 'material-symbols-outlined';
    attachFile.textContent = 'attach_file';

    const sendButton = document.createElement('button');
    sendButton.className = 'footer-button send-button';
    sendButton.type = 'submit';
    sendButton.style.display = 'none';
    sendButton.onclick = () => { form.requestSubmit(); };

    const send = document.createElement('span');
    send.className = 'material-symbols-outlined';
    send.textContent = 'send';

    attachFileButton.appendChild(attachFile);
    sendButton.appendChild(send);

    messageInputContainer.appendChild(messageInput);
    messageInputContainer.appendChild(attachFileButton);
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
            let messageSender = document.createElement('span');
            messageSender.className = 'message-sender';
            messageSender.textContent = sender;

            let messageText = document.createElement('span');
            messageText.className = 'message-text';
            messageText.textContent = text;

            let messageTime = document.createElement('span');
            messageTime.className = 'message-time';
            messageTime.textContent = time;

            messageDiv.appendChild(messageSender);
            messageDiv.appendChild(messageText);
            messageDiv.appendChild(messageTime);

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
