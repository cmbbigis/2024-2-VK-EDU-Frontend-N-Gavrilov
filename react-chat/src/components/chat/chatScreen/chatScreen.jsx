import React, { useState, useEffect } from 'react';

import './chatScreen.scss';

export const ChatScreen = (chatId) => {
    const [messages, setMessages] = useState([]);
    const [messageText, setMessageText] = useState('');

    useEffect(() => {
        loadMessages(chatId);
    }, [chatId]);

    const handleInput = (event) => {
        setMessageText(event.target.value);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        if (messageText.trim()) {
            saveMessage(chatId, messageText.trim(), 'Я');
            loadMessages(chatId);
            setMessageText('');
        }
    };

    const loadMessages = (chatId) => {
        const messages = JSON.parse(localStorage.getItem('messages')) || [];
        const filteredMessages = messages.filter(message => message.chatId === chatId) || [];
        setMessages(filteredMessages);
    };

    const saveMessage = (chatId, text, sender) => {
        const messages = JSON.parse(localStorage.getItem('messages')) || [];
        const time = new Date().toLocaleString();
        messages.push({ chatId, text, sender, time });
        localStorage.setItem('messages', JSON.stringify(messages));
    };

    return (
        <div className="chat-screen">
            <div className="messages">
                {messages.map(({ text, sender, time }, index) => (
                    <div
                        key={index}
                        className={`message ${sender === 'Я' ? 'my-message' : 'interlocutor-message'} new-message`}
                    >
                        <span className="message-sender">{sender}</span>
                        <span className="message-text">{text}</span>
                        <span className="message-time">{time}</span>
                    </div>
                ))}
            </div>
            <form className="form" onSubmit={handleSubmit}>
                <label className="message-input-container">
                    <input
                        className="message-input"
                        name="message-text"
                        placeholder="Сообщение"
                        type="text"
                        value={messageText}
                        onChange={handleInput}
                    />
                    <button className="footer-button attach-file-button" type="button">
                        <span className="material-symbols-outlined">attach_file</span>
                    </button>
                    <button
                        className="footer-button send-button"
                        type="submit"
                        style={{ display: messageText.trim() ? 'block' : 'none' }}
                    >
                        <span className="material-symbols-outlined">send</span>
                    </button>
                </label>
            </form>
        </div>
    );
}
