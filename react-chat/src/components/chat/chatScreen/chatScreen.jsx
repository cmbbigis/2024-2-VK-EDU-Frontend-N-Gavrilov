import React, { useState, useEffect, useRef } from 'react';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import SendIcon from '@mui/icons-material/Send';

import './chatScreen.scss';
import { BackendHttpClient } from "../../../utils/backendHttpClient";
import { Centrifugo } from "../../../utils/Centrifugo";

export const ChatScreen = ({ chatId }) => {
    const [messages, setMessages] = useState([]);
    const [messageText, setMessageText] = useState('');
    const messagesEndRef = useRef();
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    const centrifugoRef = useRef(null);

    useEffect(() => {
        loadMessages(chatId);
        centrifugoRef.current = Centrifugo(chatId, setMessages);
        return () => centrifugoRef.current;
    }, [chatId]);

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const handleInput = (event) => {
        setMessageText(event.target.value);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (messageText.trim()) {
            await saveMessage(chatId, messageText.trim(), 'Я');
            await loadMessages(chatId);
            setMessageText('');
        }
    };

    const loadMessages = async (chatId) => {
        let pageNumber = 1;
        let pageSize = 30;
        let messages = [];
        let response = { 'next': '' };
        while (response['next'] !== null) {
            response = await BackendHttpClient.getChatMessages(chatId, pageNumber++, pageSize)
            messages = messages.concat(response['results']);
        }
        setMessages(messages);
    };

    const saveMessage = async (chatId) => {
        let formData = new FormData(document.getElementById("message-form"));
        formData.append("chat", chatId);
        await BackendHttpClient.sendMessage(formData);
    };

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    return (
        <div className="chat-screen">
            <div className="messages">
                {messages.slice().reverse().map((message, index) => {
                            const senderUsername = message['sender']['username'];
                            const senderFirstName = message['sender']['first_name'];
                            return (
                                <div
                                    key={index}
                                    className={`message ${senderUsername === currentUser['username'] ? 'my-message' : 'interlocutor-message'} new-message`}
                                >
                                    <span className="message-sender">{senderFirstName}</span>
                                    <span className="message-text">{message['text']}</span>
                                    <span className="message-time">{message['created_at']}</span>
                                </div>
                            )
                        }
                    )
                }
                <div ref={messagesEndRef}/>
            </div>
            <form className="form" id="message-form" encType="multipart/form-data" onSubmit={handleSubmit}>
                <div className="message-input-container">
                    <input
                        className="message-input"
                        name="text"
                        placeholder="Сообщение"
                        type="text"
                        value={messageText}
                        onChange={handleInput}
                    />
                    <button className="footer-button attach-file-button" type="button">
                        <AttachFileIcon />
                    </button>
                    <button
                        className="footer-button send-button"
                        type="submit"
                        style={{ display: messageText.trim() ? 'block' : 'none' }}
                    >
                        <SendIcon className="sendIcon"/>
                    </button>
                </div>
            </form>
        </div>
    );
}
