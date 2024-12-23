import {Header} from "../../components/Header/Header.tsx";
import {TranslateWindow} from "../../components/TranslateWindow/TranslateWindow.tsx";

import './TranslatePage.css';

export const TranslatePage = () => {
    return (
        <div className='translate-page'>
            <Header title="VK Translate" />
            <TranslateWindow />
        </div>
    );
}