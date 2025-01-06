import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    translateFrom: 'Autodetect',
    translateTo: 'en-GB',
    textToTranslate: '',
    translatedText: '',
    history: JSON.parse(localStorage.getItem('history') || '[]'),
};

export const slice = createSlice({
    name: 'slice',
    initialState,
    reducers: {
        setTranslateFrom(state, action) {
            state.translateFrom = action.payload;
        },
        setTranslateTo(state, action) {
            state.translateTo = action.payload;
        },
        setTextToTranslate(state, action) {
            state.textToTranslate = action.payload;
        },
        setTranslatedText(state, action) {
            state.translatedText = action.payload;
        },
        setHistory(state, action) {
            state.history = action.payload;
            localStorage.setItem('history', JSON.stringify(state.history));
        },
    }
});

export const { setTranslateFrom, setTranslateTo, setTextToTranslate, setTranslatedText, setHistory } = slice.actions;