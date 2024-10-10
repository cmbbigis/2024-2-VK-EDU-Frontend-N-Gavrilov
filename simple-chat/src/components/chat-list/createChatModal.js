import { createChat } from "./chat.js";

export function createModal() {
    const modal = document.createElement('div');
    modal.className = 'modal';
    modal.id = 'create-chat-modal';
    modal.style.display = 'none';

    const modalContent = document.createElement('div');
    modalContent.className = 'modal-content';
    const close = document.createElement('span');
    close.className = 'close';
    close.innerText = 'Close';
    close.onclick = function() {
        modal.style.display = 'none';
    }
    window.onclick = function(event) {
        if (event.target === modal) {
            modal.style.display = 'none';
        }
    }
    const createChatText = document.createElement('h2');
    createChatText.className = 'create-chat-text';
    createChatText.innerText = 'Создание чата';

    const chatForm = document.createElement('form');
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
    const create = document.createElement('button');
    create.type = 'submit';
    create.textContent = 'Create';

    chatForm.appendChild(interlocutorLabel);
    chatForm.appendChild(interlocutorInput);
    chatForm.appendChild(avatarLabel);
    chatForm.appendChild(avatarInput);
    chatForm.appendChild(create);

    modalContent.appendChild(close);
    modalContent.appendChild(createChatText);
    modalContent.appendChild(chatForm);

    modal.appendChild(modalContent);

    return modal;

    function createChat(event) {
        event.preventDefault();
        const interlocutor = document.getElementById('interlocutor').value;
        const avatar = document.getElementById('avatar').files;
        const chats = JSON.parse(localStorage.getItem('chats')) || [];
        chats.push({id: IdGenerator.generateId(), interlocutor, avatar});
        localStorage.setItem('chats', JSON.stringify(chats));
        modal.style.display = 'none';
        document.getElementById('interlocutor').placeholder = '';
        document.getElementById('avatar').placeholder = '';
        loadChats(document.getElementsByClassName('chat-list')[0]);
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

class IdGenerator {
    static currentId = 0;

    static generateId() {
        return this.currentId++;
    }
}