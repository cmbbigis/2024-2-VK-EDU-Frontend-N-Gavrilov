import React, { useState } from 'react';
import CloseIcon from '@mui/icons-material/Close';

import './createChatModal.scss';

export const CreateChatModal = ({ onClose, onChatCreated }) => {
    const [interlocutor, setInterlocutor] = useState('');
    const [avatar, setAvatar] = useState(null);

    const handleSubmit = (event) => {
        event.preventDefault();
        const reader = new FileReader();
        reader.onload = handleImageLoad;
        reader.readAsDataURL(avatar);
    };

    const handleImageLoad = (e) => {
        const img = new Image();
        img.src = e.target.result;
        img.onload = () => resizeImage(img);
    };

    const resizeImage = (img) => {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        const maxWidth = 100;
        const maxHeight = 100;
        let { width, height } = img;

        if (width > height && width > maxWidth) {
            height *= maxWidth / width;
            width = maxWidth;
        } else if (height > maxHeight) {
            width *= maxHeight / height;
            height = maxHeight;
        }

        canvas.width = width;
        canvas.height = height;
        ctx.drawImage(img, 0, 0, width, height);
        const resizedAvatarDataUrl = canvas.toDataURL('image/jpeg');
        saveChat(interlocutor, resizedAvatarDataUrl);
        resetForm();
    };

    const saveChat = (interlocutor, avatar) => {
        const chats = JSON.parse(localStorage.getItem('chats')) || [];
        const chatId = Math.floor(Math.random() * 100000);
        const newChat = { id: chatId, interlocutor, avatar };
        chats.push(newChat);
        localStorage.setItem('chats', JSON.stringify(chats));

        const messages = JSON.parse(localStorage.getItem('messages')) || [];
        const text = 'Привет!';
        const time = new Date().toLocaleString();
        messages.push({ chatId, text, sender: interlocutor, time });
        localStorage.setItem('messages', JSON.stringify(messages));
    };

    const resetForm = () => {
        setInterlocutor('');
        setAvatar(null);
        onClose();
        onChatCreated();
    };

    return (
        <div className="modal" id="create-chat-modal" style={{ display: 'block' }}>
            <div className="modal-content">
                <div className="modal-header">
                    <h2 className="create-chat-text">Создание чата</h2>
                    <button className="close-button" onClick={onClose}>
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
    );
}

