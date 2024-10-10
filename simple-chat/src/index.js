import './index.css';

const form = document.querySelector('form');
const messageInput = document.querySelector('.message-input');
const messagesContainer = document.querySelector('.messages');

form.addEventListener('submit', handleSubmit);

loadMessages();

function handleSubmit(event) {
    event.preventDefault();
    const text = messageInput.value.trim();
    const sender = 'Я';
    if (text) {
        saveMessage(text, sender);
        loadMessages();
        messageInput.value = '';
    }
}

function loadMessages() {
    const messages = JSON.parse(localStorage.getItem('messages')) || [];
    messagesContainer.innerHTML = '';
    messages.forEach(({ text, sender, time }) => {
        const messageDiv = document.createElement('div');
        messageDiv.classList.add('message');
        messageDiv.innerHTML = `<strong>${sender}</strong> (<em>${time}</em>):<br>${text}`;
        messagesContainer.appendChild(messageDiv);
    });
}

function saveMessage(text, sender) {
    const messages = JSON.parse(localStorage.getItem('messages')) || [];
    const time = new Date().toLocaleString();
    messages.push({ text, sender, time });
    localStorage.setItem('messages', JSON.stringify(messages));
}
