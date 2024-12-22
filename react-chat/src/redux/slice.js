import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    currentChatId: null,
    currentUser: JSON.parse(localStorage.getItem("currentUser")),
    chats: [],
    isAuthorized: JSON.parse(sessionStorage.getItem('isAuthenticated')) || false,
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
        login: (state, action) => {
            state.isAuthorized = true;
            sessionStorage.setItem('isAuthorized', 'true');
        },
        logout: (state, action) => {
            state.isAuthorized = false;
            sessionStorage.removeItem('isAuthorized');
            localStorage.removeItem('currentUser');
            localStorage.removeItem('access');
            localStorage.removeItem('refresh');
        },
    }
});

export const { setCurrentChatId, setCurrentUser, setChats, login, logout } = slice.actions;