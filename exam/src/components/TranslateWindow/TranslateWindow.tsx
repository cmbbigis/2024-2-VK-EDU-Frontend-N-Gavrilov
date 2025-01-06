import SwapHorizIcon from '@mui/icons-material/SwapHoriz';
import {useDispatch, useSelector} from "react-redux";

import './TranslateWindow.css';
import React from "react";
import {setTextToTranslate, setTranslatedText, setTranslateFrom, setTranslateTo} from "../../redux/slice.ts";
import {RootState} from "../../redux/RootState.ts";
import {TranslateUtils, useHistoryUtils} from "../../ts/utils";
import {languages} from "../../languages.ts";

export const TranslateWindow: React.FC = ()  => {
    const dispatch = useDispatch();
    const { translateTo, translateFrom, textToTranslate, translatedText } = useSelector((state: RootState) => state.slice);
    const { addToHistory } = useHistoryUtils();
    const languageMap = new Map<string, string>(Object.entries(languages));

    const handleInput = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        dispatch(setTextToTranslate(event.target.value));
    };

    const handleTranslateClick = async (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
        const response = await TranslateUtils.translate(textToTranslate, translateFrom, translateTo);
        dispatch(setTranslatedText(response));
        addToHistory(`${textToTranslate}/${translateFrom}/${translateTo}`);
    };

    const handleSwitchClick = async (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
        if (translateFrom !== 'Autodetect') {
            const tmp = translateFrom;
            dispatch(setTranslateFrom(translateTo));
            dispatch(setTranslateTo(tmp));
        }
    };

    const handleTranslateToChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        dispatch(setTranslateTo(event.target.value));
    };

    const handleTranslateFromChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        dispatch(setTranslateFrom(event.target.value));
    };

    return (
        <div className="translate-window">
            <div className="translate-window-header">
                <div className="translate-window-header-left">
                    <span>{languageMap.get(translateFrom)}</span>
                    <select
                        className="interlocutors-select"
                        name="members"
                        onChange={handleTranslateFromChange}
                    >
                        {
                            Object.entries(languages).map(([code, name]) => (
                                <option key={name} value={code}>
                                    {name}
                                </option>
                            ))
                        }
                    </select>
                </div>
                <span className="switch-button" onClick={handleSwitchClick}>
                    <SwapHorizIcon/>
                </span>
                <div className="translate-window-header-right">
                    <span>{languageMap.get(translateTo)}</span>
                    <select
                        className="interlocutors-select"
                        name="members"
                        defaultValue={'en-GB'}
                        onChange={handleTranslateToChange}
                    >
                        {
                            Object.entries(languages).map(([code, name]) => (
                                code !== 'Autodetect' && (
                                <option key={code} value={code}>
                                    {name}
                                </option>
                            )))
                        }
                    </select>
                </div>
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