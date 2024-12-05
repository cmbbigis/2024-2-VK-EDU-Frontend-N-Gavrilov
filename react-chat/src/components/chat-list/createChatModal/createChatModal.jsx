import React, {useCallback, useEffect, useState} from 'react';
import CloseIcon from '@mui/icons-material/Close';

import './createChatModal.scss';
import { BackendClient } from "../../../utils/backendClient";

export const CreateChatModal = ({ onClose, onChatCreated }) => {
    const [comboboxOptions, setComboboxOptions] = useState([]);
    const [filter, setFilter] = useState('');
    const [selectedInterlocutors, setSelectedInterlocutors] = useState([]);
    const [inputValue, setInputValue] = useState('');

    const loadPossibleInterlocutors = useCallback(async () => {
        const response = await BackendClient.getUsers(1, 100, filter);
        const possibleInterlocutors = response.results.map(interlocutor => ({
            value: interlocutor.id,
            label: `${interlocutor.first_name} ${interlocutor.last_name} (@${interlocutor.username})`
        }));
        setComboboxOptions(possibleInterlocutors);
    }, [filter]);

    useEffect(() => {
        loadPossibleInterlocutors();
    }, [filter, loadPossibleInterlocutors]);

    const handleSubmit = async (event) => {
        event.preventDefault();
        await saveChat();
        resetForm();
    };

    const saveChat = async () => {
        let chatFormData = new FormData(document.getElementById("chat-form"));
        const creator = await BackendClient.getUser('current');
        chatFormData.append('creator', JSON.stringify({
            "username": creator["username"],
            "first_name": creator["first_name"],
            "last_name": creator["last_name"],
            "bio": creator["bio"],
            "avatar": creator["avatar"]
        }))
        chatFormData.append('is_private', selectedInterlocutors.length <= 1);
        await BackendClient.createChat(chatFormData);
    };

    const resetForm = () => {
        setSelectedInterlocutors([]);
        onClose();
        onChatCreated();
    };

    const handleModalClick = (event) => {
        if (event.target.className === 'modal') {
            onClose();
        }
    };

    const handleInputChange = (event) => {
        const value = event.target.value;
        setInputValue(value);
        setFilter(value);
    };

    const handleSelectChange = (event) => {
        const value = Array.from(event.target.selectedOptions, option => option.value);
        setSelectedInterlocutors(value);
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
                    {selectedInterlocutors.length > 1 && <div className="title-input-container">
                        <label htmlFor="title">Название</label>
                        <input name="title"></input>
                    </div>}
                    <label htmlFor="members">Собеседники</label>
                    <div className="interlocutors-combobox">
                        <input
                            type="text"
                            value={inputValue}
                            onChange={handleInputChange}
                            placeholder="Начните вводить имя или юзернейм"
                        />

                        <select
                            className="interlocutors-select"
                            name="members"
                            multiple
                            onChange={handleSelectChange}
                            required
                        >
                            {
                                comboboxOptions.map(option => (
                                    <option key={option.value} value={option.value}>
                                        {option.label}
                                    </option>
                                ))
                            }
                        </select>
                    </div>

                    <button className="create-button" type="button" onClick={handleSubmit}>Создать</button>
                </form>
            </div>
        </div>
    );
}

