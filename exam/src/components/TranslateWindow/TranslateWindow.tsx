import SwapHorizIcon from '@mui/icons-material/SwapHoriz';
import {useDispatch, useSelector} from "react-redux";

import './TranslateWindow.css';
import React from "react";
import {setTextToTranslate, setTranslatedText} from "../../redux/slice.ts";
import {RootState} from "../../redux/RootState.ts";
import * as TranslateUtils from "../../ts/utils/translate.ts";

export const TranslateWindow: React.FC = ()  => {
    const dispatch = useDispatch();
    const { textToTranslate, translatedText } = useSelector((state: RootState) => state.slice)

    const handleInput = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        dispatch(setTextToTranslate(event.target.value));
    };

    const handleTranslateClick = async (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
        const response = await TranslateUtils.translate(textToTranslate, 'ru', 'en');
        dispatch(setTranslatedText(response));
    };


    return (
        <div className="translate-window">
            <div className="translate-window-header">
                <div className="translate-window-header-left">HeaderLeft</div>
                <span className="switch-button">
                    <SwapHorizIcon/>
                </span>
                <div className="translate-window-header-right">HeaderRight</div>
            </div>
            <div className="translate-window-body">
                <div className="translate-window-body-left">
                    <textarea className="translate-input" onChange={handleInput} value={textToTranslate}></textarea>
                </div>
                <div className="translate-window-body-right">
                    <textarea className="translated-textarea" defaultValue={translatedText}></textarea>
                </div>
            </div>
            <button onClick={handleTranslateClick}>Перевести</button>
        </div>
    );
}