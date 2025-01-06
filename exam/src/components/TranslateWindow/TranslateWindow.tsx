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
            addToHistory(`${textToTranslate}/${translateFrom}/${translateTo}/${response}`);
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
        <>
            <div className="translate-window">
                <div>
                    <span className='language-span'>{languageMap.get(translateFrom)}</span>
                    <select
                        className="language-select"
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
                <div>
                    <span className='language-span'>{languageMap.get(translateTo)}</span>
                    <select
                        className="language-select"
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
                <div>
                    <textarea className="translate-textarea" onChange={handleInput} value={textToTranslate}></textarea>
                </div>
                <div>
                    <textarea className="translate-textarea" value={translatedText} placeholder={'Перевод'}></textarea>
                </div>
                <span className="switch-button" onClick={handleSwitchClick}>
                    <SwapHorizIcon/>
                </span>
            </div>
            <button className='translate-button' onClick={handleTranslateClick}>Перевести</button>
        </>
    );
}