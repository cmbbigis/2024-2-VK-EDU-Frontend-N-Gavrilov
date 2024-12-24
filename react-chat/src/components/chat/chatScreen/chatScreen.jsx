import React, {useState, useEffect, useRef, useCallback} from 'react';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import SendIcon from '@mui/icons-material/Send';
import MicIcon from '@mui/icons-material/Mic';
import CancelIcon from "@mui/icons-material/Cancel";
import CloseIcon from "@mui/icons-material/Close";

import './chatScreen.scss';
import BackendClient from "../../../utils/BackendClient";
import { Centrifugo } from "../../../utils/Centrifugo";
import { useRecorder } from "../../../utils/useRecorder";
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import {MapComponent} from "../mapComponent/mapComponent";
import {useSelector} from "react-redux";
import {LazyImage} from "../../LazyImage";
import PropTypes from "prop-types";

export const ChatScreen = ({ chatId }) => {
    const [messages, setMessages] = useState([]);
    const [messageText, setMessageText] = useState('');
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [hideTimeout, setHideTimeout] = useState(null);
    const [uploadedImages, setUploadedImages] = useState([]);
    const centrifugoRef = useRef(null);
    const messagesEndRef = useRef();

    const { currentUser } = useSelector((state) => state.slice)
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
        const blob = new Blob([audio], { type: 'audio/ogg' });
        const file = new File([blob], 'voice.ogg', { type: 'audio/ogg' });

        const request = {
            chat: chatId,
            voice: file
        };

        await BackendClient.sendMessage(request);
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
        if (messageText.trim() || uploadedImages.length > 0) {
            const texToSend = messageText.trim();
            setMessageText('');
            await saveMessage(chatId, texToSend);
            await loadMessages(chatId);
        }
    };

    const loadMessages = async (chatId) => {
        let pageNumber = 1;
        let pageSize = 30;
        let messages = [];
        let response = { 'next': '' };
        while (response['next'] !== null) {
            response = await BackendClient.getChatMessages({chat: chatId, page: pageNumber++, page_size: pageSize})
            messages = messages.concat(response['results']);
        }
        setMessages(messages);
    };

    const saveMessage = async (chatId, messageText) => {
        const request = {
            chat: chatId,
            text: messageText ? messageText : null,
            files: uploadedImages ? uploadedImages.map((image) => image.file) : null
        }

        await BackendClient.sendMessage(request);
        setUploadedImages([]);
        setTimeout(updatePaddingBottom, 0);
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

    const handleFileChange = (fileList) => {
        const files = Array.from(fileList);
        if (uploadedImages.length + files.length > 10) {
            toast.warn("Нельзя прикрепить больше 10 файлов");
            return;
        }
        const newImages = files.map(file => ({
            file,
            preview: URL.createObjectURL(file),
        }));
        setUploadedImages([...uploadedImages, ...newImages]);
        setTimeout(() => {
            updatePaddingBottom();
            scrollToBottom();
        }, 0);
    };

    const handleDragOver = (e) => {
        e.preventDefault();
        e.currentTarget.classList.add('drag-over');
    };

    const handleDragLeave = (e) => {
        e.currentTarget.classList.remove('drag-over');
    };

    const handleDrop = (e) => {
        e.preventDefault();
        e.currentTarget.classList.remove('drag-over');
        handleFileChange(e.dataTransfer.files);
    };

    const handleRemoveImage = (index) => {
        setUploadedImages(uploadedImages.filter((_, i) => i !== index));
        setTimeout(updatePaddingBottom, 0);
    };

    function updatePaddingBottom() {
        const chatScreen = document.getElementById('chat-screen');
        const footer = document.getElementById('footer');
        const newPadding = footer.offsetHeight - 10;
        chatScreen.style.paddingBottom = `${newPadding}px`;
    }

    return (
        <div className="chat-screen" id='chat-screen'>
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
                                    {message['files'] && message['files'].map((image, imgIndex) => (
                                        <LazyImage key={imgIndex} src={image.item} alt={`${imgIndex}`} className="message-image"/>
                                    ))}
                                    <span
                                        className="message-time">{new Date(message['created_at']).toLocaleString()}</span>
                                </div>
                            )
                        }
                    )
                }
                <div ref={messagesEndRef}/>
            </div>
            <div className="footer" id='footer' onDragOver={handleDragOver} onDragLeave={handleDragLeave} onDrop={handleDrop}>
                {isDropdownOpen && (
                    <div className="dropdown-menu"
                         onMouseEnter={handleMouseEnter}
                         onMouseLeave={handleMouseLeave}
                         style={{bottom: `${document.getElementById('footer').offsetHeight - 5}px`}}
                    >
                        <label className="dropdown-item">
                            Upload File
                            <input type="file" multiple
                                   onChange={(event) => handleFileChange(event.target.files)}
                                   style={{display: 'none'}}/>
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
                        {!messageText.trim() && uploadedImages.length === 0 && !isRecording && <button
                            className="footer-button voice-button"
                            type="button"
                            onClick={startRecording}
                        >
                            <MicIcon className="micIcon"/>
                        </button>}
                        {!messageText.trim() && uploadedImages.length === 0 && isRecording && <div className='recording-buttons'>
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
                        {(messageText.trim() || uploadedImages.length > 0) && <button
                            className="footer-button send-button"
                            type="submit"
                        >
                            <SendIcon className="sendIcon"/>
                        </button>}
                    </div>
                    {uploadedImages.length > 0 && <div className="image-previews">
                        {uploadedImages.map((image, index) => (
                            <div key={index} className="image-preview-container">
                                <LazyImage src={image.preview} alt={`preview ${index}`} className="image-preview" />
                                <button type="button" className="remove-image-button" onClick={() => handleRemoveImage(index)}>
                                    <CloseIcon />
                                </button>
                            </div>
                        ))}
                    </div>}
                </form>
            </div>
        </div>
    );
}

ChatScreen.propTypes = {
    chatId: PropTypes.string.isRequired
};
