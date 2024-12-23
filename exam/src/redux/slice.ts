import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    translateFrom: 'Autodetect',
    translateTo: '',
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
    }
});

export const { setTranslateFrom, setTranslateTo } = slice.actions;