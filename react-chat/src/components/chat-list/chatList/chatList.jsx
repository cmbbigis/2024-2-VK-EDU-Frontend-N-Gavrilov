import React, {useEffect, useRef, useState} from 'react';

import './chatList.scss';
import { Chat } from "../chat";
import { BackendHttpClient } from "../../../utils/backendHttpClient";
import { Centrifugo } from "../../../utils/Centrifugo";

export const ChatList = ({ reload }) => {
    const [chats, setChats] = useState([]);
    const centrifugoRef = useRef(null);

    useEffect(() => {
        loadChats();
        centrifugoRef.current = Centrifugo(null, null, null, setChats);
        return () => centrifugoRef.current;
    }, [reload]);

    async function loadChats() {
        let pageNumber = 1;
        let pageSize = 30;
        let chats = [];
        let response = { 'next': '' };
        while (response['next'] !== null) {
            response = await BackendHttpClient.getChats(pageNumber++, pageSize)
            chats = chats.concat(response['results']);
        }
        setChats(chats);
    }

    return (
        <div id="chat-list" className="chat-list">
            {
                console.log(chats) || chats.map((chat) => (
                        <Chat key={chat["id"]} id={chat["id"]} interlocutor={chat["title"]} avatar={chat["avatar"]} lastMessage={chat["last_message"]}/>
                    )
                )
            }
        </div>
    );
}
