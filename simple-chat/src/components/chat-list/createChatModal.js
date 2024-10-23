import { createChat } from "./chat.js";

export function createModal() {
    const modal = document.createElement('div');
    modal.className = 'modal';
    modal.id = 'create-chat-modal';
    modal.style.display = 'none';

    const modalContent = document.createElement('div');
    modalContent.className = 'modal-content';
    const modalHeader = document.createElement('div');
    modalHeader.className = 'modal-header';

    const closeButton = document.createElement('button');
    closeButton.className = 'close-button';
    closeButton.onclick = function() {
        modal.style.display = 'none';
    }
    window.onclick = function(event) {
        if (event.target === modal) {
            modal.style.display = 'none';
        }
    }

    const close = document.createElement('span');
    close.className = 'material-symbols-outlined';
    close.textContent = 'Close';


    const createChatText = document.createElement('h2');
    createChatText.className = 'create-chat-text';
    createChatText.innerText = 'Создание чата';

    const chatForm = document.createElement('form');
    chatForm.className = 'chat-form';
    chatForm.id = 'chat-form';
    chatForm.onsubmit = createChat;
    const interlocutorLabel = document.createElement('label');
    interlocutorLabel.textContent = 'Имя собеседника:';
    interlocutorLabel.htmlFor = 'interlocutor';
    const interlocutorInput = document.createElement('input');
    interlocutorInput.id = 'interlocutor';
    interlocutorInput.type = 'text';
    interlocutorInput.name = 'interlocutor';
    interlocutorInput.required = true;
    const avatarLabel = document.createElement('label');
    avatarLabel.textContent = 'Аватар собеседника:';
    avatarLabel.htmlFor = 'avatar';
    const avatarInput = document.createElement('input');
    avatarInput.id = 'avatar';
    avatarInput.type = 'file';
    avatarInput.name = 'avatar';
    avatarInput.accept = 'image/*';
    avatarInput.required = false;
    const createButton = document.createElement('button');
    createButton.className = 'create-button';
    createButton.type = 'submit';
    createButton.textContent = 'Создать';

    closeButton.appendChild(close);

    chatForm.appendChild(interlocutorLabel);
    chatForm.appendChild(interlocutorInput);
    chatForm.appendChild(avatarLabel);
    chatForm.appendChild(avatarInput);
    chatForm.appendChild(createButton);

    modalHeader.appendChild(createChatText);
    modalHeader.appendChild(closeButton);

    modalContent.appendChild(modalHeader);
    modalContent.appendChild(chatForm);

    modal.appendChild(modalContent);

    return modal;

    function createChat(event) {
        event.preventDefault();
        const chatList = document.getElementsByClassName('chat-list')[0];
        const interlocutor = document.getElementById('interlocutor').value;
        const avatar = document.getElementById('avatar').files[0];

        const reader = new FileReader();
        reader.onload = function(e) {
            const img = new Image();
            img.src = e.target.result;
            img.onload = function() {
                const canvas = document.createElement('canvas');
                const ctx = canvas.getContext('2d');
                const maxWidth = 100;
                const maxHeight = 100;
                let width = img.width;
                let height = img.height;

                if (width > height) {
                    if (width > maxWidth) {
                        height *= maxWidth / width;
                        width = maxWidth;
                    }
                } else {
                    if (height > maxHeight) {
                        width *= maxHeight / height;
                        height = maxHeight;
                    }
                }
                canvas.width = width;
                canvas.height = height;
                ctx.drawImage(img, 0, 0, width, height);
                const resizedAvatarDataUrl = canvas.toDataURL('image/jpeg');
                saveChat(interlocutor, resizedAvatarDataUrl);
                document.getElementById('interlocutor').value = '';
                document.getElementById('avatar').value = '';
                modal.style.display = 'none';
                loadChats(chatList);
            };
        };
        reader.readAsDataURL(avatar);
    }

    function saveChat(interlocutor, avatar) {
        const chats = JSON.parse(localStorage.getItem('chats')) || [];
        const chatId = Number(Math.random() * 100000)
        const newChat = {
            id: chatId,
            interlocutor,
            avatar
        };
        chats.push(newChat);
        localStorage.setItem('chats', JSON.stringify(chats));
        const messages = JSON.parse(localStorage.getItem('messages')) || [];
        const text = 'Привет!';
        const time = new Date().toLocaleString();
        messages.push({ chatId, text, sender: interlocutor, time});
        localStorage.setItem('messages', JSON.stringify(messages));
    }
}

export function loadChats(container) {
    const chats = JSON.parse(localStorage.getItem('chats')) || [];
    container.innerHTML = '';
    chats.forEach(({ id, interlocutor, avatar }) => {
        const chat = createChat(id, interlocutor, avatar);
        container.appendChild(chat);
    });
    container.scrollTop = container.scrollHeight;
}
