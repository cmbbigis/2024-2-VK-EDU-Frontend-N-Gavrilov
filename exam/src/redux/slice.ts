import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    translateFrom: 'Autodetect',
    translateTo: '',
    textToTranslate: '',
    translatedText: '',
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
    }
});

export const { setTranslateFrom, setTranslateTo, setTextToTranslate, setTranslatedText } = slice.actions;