import {Header} from "../../components/Header/Header.tsx";
import {TranslateWindow} from "../../components/TranslateWindow/TranslateWindow.tsx";

import './TranslatePage.css';
import {Link} from "react-router-dom";
import RestoreIcon from '@mui/icons-material/Restore';

export const TranslatePage = () => {
    return (
        <div className='translate-page'>
            <Header title="VK Translate" />
            <Link to={"/history/"} className="history-link">
                <RestoreIcon />
            </Link>
            <TranslateWindow />
        </div>
    );
}