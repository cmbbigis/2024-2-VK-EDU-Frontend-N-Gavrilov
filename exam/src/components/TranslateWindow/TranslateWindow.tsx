import SwapHorizIcon from '@mui/icons-material/SwapHoriz';

import './TranslateWindow.css';
import React, {useState} from "react";
import {TranslateUtils, useHistoryUtils} from "../../ts/utils";
import {languages} from "../../languages.ts";

export const TranslateWindow: React.FC = ()  => {
    const [translateTo, setTranslateTo] = useState<string>('en-GB');
    const [translateFrom, setTranslateFrom] = useState<string>('Autodetect');
    const [textToTranslate, setTextToTranslate] = useState<string>('');
    const [translatedText, setTranslatedText] = useState<string>('');

    const { addToHistory } = useHistoryUtils();
    const languageMap = new Map<string, string>(Object.entries(languages));

    const handleInput = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        setTextToTranslate(event.target.value);
    };

    const handleTranslateClick = async (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
        const response = await TranslateUtils.translate(textToTranslate, translateFrom, translateTo);
        if (response !== null) {
            setTranslatedText(response);
            addToHistory(`${textToTranslate}/${translateFrom}/${translateTo}`);
        }
    };

    const handleSwitchClick = async (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
        if (translateFrom !== 'Autodetect') {
            const tmp = translateFrom;
            setTranslateFrom(translateTo);
            setTranslateTo(tmp);
        }
    };

    const handleTranslateToChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setTranslateTo(event.target.value);
    };

    const handleTranslateFromChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setTranslateFrom(event.target.value);
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