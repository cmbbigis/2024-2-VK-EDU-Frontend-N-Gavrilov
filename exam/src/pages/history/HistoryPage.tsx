import {Header} from "../../components/Header/Header.tsx";
import {RootState} from "../../redux/RootState.ts";
import {useHistoryUtils} from "../../ts/utils";
import {languages} from "../../languages.ts";
import {useSelector} from "react-redux";
import {Link} from "react-router-dom";
import './HistoryPage.css';

export const HistoryPage = () => {
    const { history } = useSelector((state: RootState) => state.slice);
    const { deleteHistory } = useHistoryUtils();
    const languageMap = new Map<string, string>(Object.entries(languages));

    return (
        <>
            <Header title="История" />
            <div className='controls'>
                <Link to={"/"} className="back-to-translate-link">
                    Вернуться к переводу
                </Link>
                <span className='delete-history' onClick={deleteHistory}>Очистить историю</span>
            </div>
            <div className='history'>
            {
                    history.map((historyItem, index) => {
                        const historyItemArray = historyItem.split('/');
                        return (
                            <div key={index} className='history-item'>
                                <span className='languages'>
                                    {`${languageMap.get(historyItemArray[1])} → ${languageMap.get(historyItemArray[2])}`}
                                </span>
                                <span>{historyItemArray[0]}</span>
                                {historyItemArray.length > 3 && <span className='translated-text'>{historyItemArray[3]}</span>}
                            </div>
                        );
                        }
                    )
                }
            </div>
        </>
    );
}