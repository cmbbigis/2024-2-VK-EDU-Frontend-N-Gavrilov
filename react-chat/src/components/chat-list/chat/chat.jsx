import React, { useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import { Centrifugo } from "../../../utils/Centrifugo";
import DoneAllIcon from '@mui/icons-material/DoneAll';

import './chat.scss';
import {LazyImage} from "../../LazyImage";
import PropTypes from "prop-types";

export const Chat = ({ id, interlocutor, avatar, lastMessage }) => {
    const [latestMessage, setLatestMessage] = useState(lastMessage);
    const geoRegex = /https:\/\/www\.openstreetmap\.org\/#map=18\/(\d+\.\d+)\/(\d+\.\d+)/;

    useEffect(() => {
        return () => Centrifugo(id, null, setLatestMessage);
    }, [id, lastMessage]);

    const getLatestMessageText = () => {
        if (latestMessage) {
            if (latestMessage['text']) {
                if (latestMessage['text'].match(geoRegex)) {
                    return 'Геолокация';
                } else {
                    return latestMessage['text'];
                }
            } else if (latestMessage['files']) {
                return 'Файл(-ы)';
            }
        } else {
            return '';
        }
    }

    return (
        <Link to={`/chat/${id}`} key={id} className={"chat-link"}>
            <div className="chat">
                <LazyImage className="avatar" alt="Avatar" src={avatar} />
                <div className="chat-info">
                    <h2 className="chat-title">{interlocutor}</h2>
                    <p className="chat-last-message">{getLatestMessageText()}</p>
                </div>
                <div className="chat-meta">
                    <span className="last-message-time">{latestMessage && new Date(latestMessage['created_at']).toLocaleString()}</span>
                    <DoneAllIcon />
                </div>
            </div>
        </Link>
    );
}

Chat.propTypes = {
    id: PropTypes.string.isRequired,
    interlocutor: PropTypes.string.isRequired,
    avatar: PropTypes.string.isRequired,
    lastMessage: PropTypes.shape({
        text: PropTypes.string,
        files: PropTypes.arrayOf(
            PropTypes.shape({
                item: PropTypes.string.isRequired
            })
        ),
        created_at: PropTypes.string.isRequired
    })
};
