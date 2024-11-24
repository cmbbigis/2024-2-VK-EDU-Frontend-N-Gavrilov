import React, { useState } from 'react';
import CloseIcon from '@mui/icons-material/Close';

import './createChatModal.scss';
import { BackendClient } from "../../../utils/backendClient";

export const CreateChatModal = ({ onClose, onChatCreated }) => {
    const [interlocutor, setInterlocutor] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();
        await saveChat(interlocutor);
        resetForm();
    };

    const saveChat = async (interlocutorUsername) => {
        let chatFormData = new FormData(document.getElementById("chat-form"));
        const possibleInterlocutors = await BackendClient
            .getUsers(null, null, interlocutorUsername);
        const interlocutor = possibleInterlocutors["results"].find(user => user.username === interlocutorUsername);
        if (!interlocutor) {
            alert(`Error: Cannot found user ${interlocutorUsername}`);
            return;
        }
        chatFormData.append('members', interlocutor['id']);
        const creator = await BackendClient.getUser('current');
        chatFormData.append('creator', JSON.stringify({
            "username": creator["username"],
            "first_name": creator["first_name"],
            "last_name": creator["last_name"],
            "bio": creator["bio"],
            "avatar": creator["avatar"]
        }))
        chatFormData.append('is_private', true);
        await BackendClient.createChat(chatFormData);
    };

    const resetForm = () => {
        setInterlocutor('');
        onClose();
        onChatCreated();
    };

    const handleModalClick = (event) => {
        if (event.target.className === 'modal') {
            onClose();
        }
    };

    return (
        <div className="modal" id="create-chat-modal" style={{ display: 'block' }} onClick={handleModalClick}>
            <div className="modal-content">
                <div className="modal-header">
                    <h2 className="create-chat-text">Создание чата</h2>
                    <button className="close-button" onClick={onClose}>
                        <CloseIcon />
                    </button>
                </div>
                <form className="chat-form" id="chat-form" encType="multipart/form-data">
                    <label htmlFor="interlocutor">Юзернейм собеседника:</label>
                    <input
                        id="interlocutor"
                        type="text"
                        name="interlocutor"
                        value={interlocutor}
                        onChange={(e) => setInterlocutor(e.target.value)}
                        required
                    />
                    <button className="create-button" type="button" onClick={handleSubmit}>Создать</button>
                </form>
            </div>
        </div>
    );
}

