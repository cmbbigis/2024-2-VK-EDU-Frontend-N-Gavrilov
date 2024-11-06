import React, { useState } from 'react';
import CloseIcon from '@mui/icons-material/Close';

import './createChatModal.scss';
import { Chat } from '../chat';

export const CreateChatModal = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [interlocutor, setInterlocutor] = useState('');
    const [avatar, setAvatar] = useState(null);

    const handleClose = () => setIsOpen(false);
    const handleOpen = () => setIsOpen(true);

    const handleSubmit = (event) => {
        event.preventDefault();
        const reader = new FileReader();
        reader.onload = (e) => {
            const img = new Image();
            img.src = e.target.result;
            img.onload = () => {
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
                setInterlocutor('');
                setAvatar(null);
                handleClose();
                loadChats();
            };
        };
        reader.readAsDataURL(avatar);
    };

    const saveChat = (interlocutor, avatar) => {
        const chats = JSON.parse(localStorage.getItem('chats')) || [];
        const chatId = Number(Math.random() * 100000);
        const newChat = { id: chatId, interlocutor, avatar };
        chats.push(newChat);
        localStorage.setItem('chats', JSON.stringify(chats));
        const messages = JSON.parse(localStorage.getItem('messages')) || [];
        const text = 'Привет!';
        const time = new Date().toLocaleString();
        messages.push({ chatId, text, sender: interlocutor, time });
        localStorage.setItem('messages', JSON.stringify(messages));
    };

    return (
        <>
            <button onClick={handleOpen}>Создать чат</button>
            {isOpen && (
                <div className="modal" id="create-chat-modal" style={{ display: 'block' }}>
                    <div className="modal-content">
                        <div className="modal-header">
                            <h2 className="create-chat-text">Создание чата</h2>
                            <button className="close-button" onClick={handleClose}>
                                <CloseIcon />
                            </button>
                        </div>
                        <form className="chat-form" id="chat-form" onSubmit={handleSubmit}>
                            <label htmlFor="interlocutor">Имя собеседника:</label>
                            <input
                                id="interlocutor"
                                type="text"
                                name="interlocutor"
                                value={interlocutor}
                                onChange={(e) => setInterlocutor(e.target.value)}
                                required
                            />
                            <label htmlFor="avatar">Аватар собеседника:</label>
                            <input
                                id="avatar"
                                type="file"
                                name="avatar"
                                accept="image/*"
                                onChange={(e) => setAvatar(e.target.files[0])}
                            />
                            <button className="create-button" type="submit">Создать</button>
                        </form>
                    </div>
                </div>
            )}
        </>
    );
}

export function loadChats() {
    const chats = JSON.parse(localStorage.getItem('chats')) || [];
    const chatList = document.getElementsByClassName('chat-list')[0];
    chatList.innerHTML = '';
    chats.forEach(({ id, interlocutor, avatar }) => {
        const chat = Chat(id, interlocutor, avatar);
        chatList.appendChild(chat);
    });
    chatList.scrollTop = chatList.scrollHeight;
}
