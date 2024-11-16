import React, { useState, useEffect, useRef } from 'react';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import SendIcon from '@mui/icons-material/Send';

import './chatScreen.scss';

export const ChatScreen = ({ chatId }) => {
    const [messages, setMessages] = useState([]);
    const [messageText, setMessageText] = useState('');
    const messagesEndRef = useRef();

    useEffect(() => {
        loadMessages(chatId);
    }, [chatId]);

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

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

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    return (
        <div className="chat-screen">
            <div className="messages">
                {messages.map(({text, sender, time}, index) => (
                    <div
                        key={index}
                        className={`message ${sender === 'Я' ? 'my-message' : 'interlocutor-message'} new-message`}
                    >
                        <span className="message-sender">{sender}</span>
                        <span className="message-text">{text}</span>
                        <span className="message-time">{time}</span>
                    </div>
                ))}
                <div ref={messagesEndRef}/>
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
                        <AttachFileIcon />
                    </button>
                    <button
                        className="footer-button send-button"
                        type="submit"
                        style={{ display: messageText.trim() ? 'block' : 'none' }}
                    >
                        <SendIcon className="sendIcon"/>
                    </button>
                </label>
            </form>
        </div>
    );
}