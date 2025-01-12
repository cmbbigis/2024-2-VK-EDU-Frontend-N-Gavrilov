import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    history: JSON.parse(localStorage.getItem('history') || '[]'),
};

export const slice = createSlice({
    name: 'slice',
    initialState,
    reducers: {
        setHistory(state, action) {
            state.history = action.payload;
            localStorage.setItem('history', JSON.stringify(state.history));
        },
    }
});

export const { setHistory } = slice.actions;