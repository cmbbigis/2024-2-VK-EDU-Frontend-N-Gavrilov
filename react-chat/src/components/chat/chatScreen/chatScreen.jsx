import React, {useState, useEffect, useRef, useCallback} from 'react';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import SendIcon from '@mui/icons-material/Send';
import MicIcon from '@mui/icons-material/Mic';
import CancelIcon from "@mui/icons-material/Cancel";

import './chatScreen.scss';
import { BackendClient } from "../../../utils/backendClient";
import { Centrifugo } from "../../../utils/Centrifugo";
import { useRecorder } from "../../../utils/useRecorder";

export const ChatScreen = ({ chatId }) => {
    const [messages, setMessages] = useState([]);
    const [messageText, setMessageText] = useState('');
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [hideTimeout, setHideTimeout] = useState(null);
    const messagesEndRef = useRef();
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    const centrifugoRef = useRef(null);
    const [startRecording, stopRecording, cancelRecording, isRecording, audio] = useRecorder();

    useEffect(() => {
        loadMessages(chatId);
        centrifugoRef.current = Centrifugo(chatId, setMessages);
        return () => centrifugoRef.current;
    }, [chatId]);

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const sendVoice = useCallback(async () => {
        let formData = new FormData();
        formData.append("chat", chatId);
        formData.append("voice", audio, 'voice.ogg');
        await BackendClient.sendMessage(formData);
        await loadMessages(chatId);
    }, [audio, chatId]);

    useEffect(() => {
        if (audio) {
            sendVoice();
        }
    }, [audio, sendVoice]);

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
            response = await BackendClient.getChatMessages(chatId, pageNumber++, pageSize)
            messages = messages.concat(response['results']);
        }
        setMessages(messages);
    };

    const saveMessage = async (chatId) => {
        let formData = new FormData(document.getElementById("message-form"));
        formData.append("chat", chatId);
        await BackendClient.sendMessage(formData);
    };

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    const handleMouseEnter = () => {
        if (hideTimeout) {
            clearTimeout(hideTimeout);
            setHideTimeout(null);
        }
        setIsDropdownOpen(true);
    };

    const handleMouseLeave = () => {
        const timeout = setTimeout(() => {
            setIsDropdownOpen(false);
        }, 300); // Delay in milliseconds
        setHideTimeout(timeout);
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
                                    {message['text'] && <span className="message-text">{message['text']}</span>}
                                    {message['voice'] && <audio controls>
                                        <source src={message['voice']} type="audio/ogg"/>
                                    </audio>}
                                    <span
                                        className="message-time">{new Date(message['created_at']).toLocaleString()}</span>
                                </div>
                            )
                        }
                    )
                }
                <div ref={messagesEndRef}/>
            </div>
            <div className="footer">
                {isDropdownOpen && (
                    <div className="dropdown-menu" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
                        <label className="dropdown-item">
                            Upload File
                        </label>
                        <label className="dropdown-item">
                            Location
                        </label>
                    </div>
                )}
                <form className="form" id="message-form" encType="multipart/form-data" onSubmit={handleSubmit}>
                    <div className="message-input-container">
                        <button className="footer-button attach-file-button" type="button"
                                onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
                            <AttachFileIcon/>
                        </button>
                        {isRecording ? <div className="recording-div">Идёт запись...</div> : <input
                            className="message-input"
                            name="text"
                            placeholder="Сообщение"
                            type="text"
                            value={messageText}
                            onChange={handleInput}
                        />
                        }
                        {!(messageText.trim()) && !isRecording && <button
                            className="footer-button voice-button"
                            type="button"
                            onClick={startRecording}
                        >
                            <MicIcon className="micIcon"/>
                        </button>}
                        {!(messageText.trim()) && isRecording && <div className='recording-buttons'>
                            <button
                                className="footer-button voice-button"
                                type="button"
                                onClick={cancelRecording}
                            >
                                <CancelIcon className="cancelIcon"/>
                            </button>
                            <button
                                className="footer-button send-button"
                                type="button"
                                onClick={stopRecording}
                            >
                                <SendIcon className="sendIcon"/>
                            </button>
                        </div>}
                        {messageText.trim() && <button
                            className="footer-button send-button"
                            type="submit"
                        >
                            <SendIcon className="sendIcon"/>
                        </button>}
                    </div>
                </form>
            </div>

        </div>
    );
}
