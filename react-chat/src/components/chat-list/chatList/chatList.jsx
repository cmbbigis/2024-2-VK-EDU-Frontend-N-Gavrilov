import React, {useCallback, useEffect, useRef} from 'react';

import './chatList.scss';
import { Chat } from "../chat";
import { BackendClient } from "../../../utils/backendClient";
import { Centrifugo } from "../../../utils/Centrifugo";
import {useDispatch, useSelector} from "react-redux";
import {setChats} from "../../../redux/slice";

export const ChatList = ({ reload }) => {
    const dispatch = useDispatch();
    const { chats } = useSelector((state) => state.slice)
    const centrifugoRef = useRef(null);

    const loadChats = useCallback(async () => {
        let pageNumber = 1;
        let pageSize = 30;
        let chats = [];
        let response = { 'next': '' };
        while (response['next'] !== null) {
            response = await BackendClient.getChats(pageNumber++, pageSize)
            chats = chats.concat(response['results']);
        }
        dispatch(setChats(chats));
    }, [dispatch]);

    useEffect(() => {
        loadChats();
        centrifugoRef.current = Centrifugo(null, null, null, setChats);
        return () => centrifugoRef.current;
    }, [reload, loadChats]);

    return (
        <div id="chat-list" className="chat-list">
            {
                chats.map((chat) => (
                        <Chat key={chat["id"]} id={chat["id"]} interlocutor={chat["title"]} avatar={chat["avatar"]} lastMessage={chat["last_message"]}/>
                    )
                )
            }
        </div>
    );
}
