import {Header} from "../../components/Header/Header.tsx";
import {languages} from "../../languages.ts";

export const HistoryPage = () => {
    const languageMap = new Map<string, string>(Object.entries(languages));

    const historyAsString: string = localStorage.getItem("history") || '';
    let history: string[];
    if (!historyAsString.trim()) {
        history = [];
    } else {
        history = JSON.parse(historyAsString);
    }

    return (
        <>
            <Header title="История" />
            <div id="chat-list" className="chat-list">
                {
                    history.map((historyItem) => {
                        const historyItemArray = historyItem.split('/');
                        return (
                            <div>
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