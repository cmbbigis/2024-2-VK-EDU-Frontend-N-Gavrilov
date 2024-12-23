import React, {useCallback, useEffect, useState} from 'react';
import CloseIcon from '@mui/icons-material/Close';

import './createChatModal.scss';
import { BackendClient } from "../../../utils/backendClient";
import PropTypes from "prop-types";

export const CreateChatModal = ({ onClose, onChatCreated }) => {
    const [comboboxOptions, setComboboxOptions] = useState([]);
    const [selectedInterlocutors, setSelectedInterlocutors] = useState([]);
    const [errors, setErrors] = useState({});

    const [data, setData] = useState({
        "filter": ''
    });
    const filter = data["filter"];

    const handleInputChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;

        setData((prev) => ({ ...prev, [name]: value }));
        setErrors((prev) => ({ ...prev, [name]: '' }));
    };

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
        try {
            await saveChat();
            resetForm();
        } catch (error) {
            setErrors(error);
        }
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
                    {selectedInterlocutors.length > 1 &&
                        <div>
                            <div className="title-input-container">
                                <label htmlFor="title">Название</label>
                                <input name="title" onChange={handleInputChange}></input>
                            </div>
                            {errors["title"] && <div className="error">{errors["title"]}</div>}
                        </div>

                    }
                    <div>
                        <label htmlFor="members">Собеседники</label>
                        <div className="interlocutors-combobox">
                            <input
                                type="text"
                                name="filter"
                                value={data["filter"]}
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
                        {errors["members"] && <div className="error">{errors["members"]}</div>}
                    </div>

                    <button className="create-button" type="button" onClick={handleSubmit}>Создать</button>
                </form>
            </div>
        </div>
    );
}

CreateChatModal.propTypes = {
    onClose: PropTypes.func.isRequired,
    onChatCreated: PropTypes.func.isRequired
};
