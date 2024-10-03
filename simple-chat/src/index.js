const form = document.querySelector('form');
const input = document.querySelector('.form-input');
const messagesContainer = document.querySelector('.messages');

form.addEventListener('submit', handleSubmit);
form.addEventListener('keypress', handleKeyPress);

loadMessages();

function handleSubmit(event) {
    event.preventDefault();
    const message = input.value.trim();
    if (message) {
        saveMessage(message);
        loadMessages();
        input.value = '';
    }
}

function handleKeyPress(event) {
    if (event.keyCode === 13) {
        form.dispatchEvent(new Event('submit'));
    }
}

function loadMessages() {
    const messages = JSON.parse(localStorage.getItem('messages')) || [];
    messagesContainer.innerHTML = '';
    messages.forEach(message => {
        const messageDiv = document.createElement('div');
        messageDiv.classList.add('message');
        messageDiv.innerText = message;
        messagesContainer.appendChild(messageDiv);
    });
}

function saveMessage(message) {
    const messages = JSON.parse(localStorage.getItem('messages')) || [];
    messages.push(message);
    localStorage.setItem('messages', JSON.stringify(messages));
}
