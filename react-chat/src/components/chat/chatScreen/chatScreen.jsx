import React, {useState, useEffect, useRef, useCallback} from 'react';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import SendIcon from '@mui/icons-material/Send';
import MicIcon from '@mui/icons-material/Mic';
import CancelIcon from "@mui/icons-material/Cancel";

import './chatScreen.scss';
import { BackendClient } from "../../../utils/backendClient";
import { Centrifugo } from "../../../utils/Centrifugo";
import { useRecorder } from "../../../utils/useRecorder";
import { toast } from "react-toastify";
import {MapComponent} from "../mapComponent/mapComponent";

export const ChatScreen = ({ chatId }) => {
    const [messages, setMessages] = useState([]);
    const [messageText, setMessageText] = useState('');
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [hideTimeout, setHideTimeout] = useState(null);
    const messagesEndRef = useRef();
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    const centrifugoRef = useRef(null);
    const [startRecording, stopRecording, cancelRecording, isRecording, audio] = useRecorder();
    const geoRegex = /https:\/\/www\.openstreetmap\.org\/#map=18\/(\d+\.\d+)\/(\d+\.\d+)/;

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
            await saveMessage(chatId, messageText.trim());
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

    const saveMessage = async (chatId, messageText) => {
        let formData = new FormData();
        formData.append("chat", chatId);
        formData.append("text", messageText);
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
        }, 300);
        setHideTimeout(timeout);
    };

    async function success(position) {
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;

        const link = `https://www.openstreetmap.org/#map=18/${latitude}/${longitude}`;
        await saveMessage(chatId, link);
    }

    const handleGeoClick = () => {
        if (!navigator.geolocation) {
            toast.error("Geolocation is not supported by your browser");
        } else {
            navigator.geolocation.getCurrentPosition(success, () => toast.error("Unable to retrieve your location"));
        }
    }

    return (
        <div className="chat-screen">
            <div className="messages">
                {messages.slice().reverse().map((message, index) => {
                            const senderUsername = message['sender']['username'];
                            const senderFirstName = message['sender']['first_name'];
                            const geoRegexMatch = message['text'] ? message['text'].match(geoRegex) : null;
                            return (
                                <div
                                    key={index}
                                    className={`message ${senderUsername === currentUser['username'] ? 'my-message' : 'interlocutor-message'} new-message`}
                                >
                                    <span className="message-sender">{senderFirstName}</span>
                                    {message['text'] && geoRegexMatch &&
                                        <MapComponent latitude={parseFloat(geoRegexMatch[1])} longitude={parseFloat(geoRegexMatch[2])}/>
                                    }
                                    {message['text'] && !geoRegexMatch && <span className="message-text">{message['text']}</span>}
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
                        <label className="dropdown-item" onClick={handleGeoClick}>
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
