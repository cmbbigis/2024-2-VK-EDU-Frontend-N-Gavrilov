import {Header} from "../../components/Header/Header.tsx";
import {RootState} from "../../redux/RootState.ts";
import {useHistoryUtils} from "../../ts/utils";
import {languages} from "../../languages.ts";
import {useSelector} from "react-redux";

export const HistoryPage = () => {
    const { history } = useSelector((state: RootState) => state.slice);
    const { deleteHistory } = useHistoryUtils();
    const languageMap = new Map<string, string>(Object.entries(languages));

    return (
        <>
            <Header title="История" />
            <button onClick={deleteHistory}>Очистить историю</button>
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