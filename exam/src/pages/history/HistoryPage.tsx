import {Header} from "../../components/Header/Header.tsx";
import {setHistory} from "../../redux/slice.ts";
import {RootState} from "../../redux/RootState.ts";
import {languages} from "../../languages.ts";
import {useDispatch, useSelector} from "react-redux";

export const HistoryPage = () => {
    const dispatch = useDispatch();
    const { history } = useSelector((state: RootState) => state.slice)
    const languageMap = new Map<string, string>(Object.entries(languages));

    return (
        <>
            <Header title="История" />
            <button onClick={() => {
                localStorage.removeItem('history');
                dispatch(setHistory([]));
            }}>Очистить историю</button>
            <div id="chat-list" className="chat-list">
                {
                    history.map((historyItem, index) => {
                        const historyItemArray = historyItem.split('/');
                        return (
                            <div key={index}>
                                {`Текст: ${historyItemArray[0]} / Из языка: ${languageMap.get(historyItemArray[1])} / В язык: ${languageMap.get(historyItemArray[2])}`}
                            </div>
                        );
                        }
                    )
                }
            </div>
        </>
    );
}