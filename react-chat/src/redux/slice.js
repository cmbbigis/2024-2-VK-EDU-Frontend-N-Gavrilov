import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    currentChatId: null,
    currentUser: JSON.parse(localStorage.getItem("currentUser")),
    chats: []
};

export const slice = createSlice({
    name: 'slice',
    initialState,
    reducers: {
        setCurrentChatId(state, action) {
            state.chatId = action.payload;
        },
        setCurrentUser(state, action) {
            state.currentUser = action.payload;
            localStorage.setItem("currentUser", JSON.stringify(state.currentUser));
        },
        setChats(state, action) {
            state.chats = action.payload;
        },
    }
});

export const { setCurrentChatId, setCurrentUser, setChats } = slice.actions;