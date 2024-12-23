import {Header} from "../../components/Header/Header.tsx";
import {languages} from "../../languages.ts";
import {useState} from "react";

export const HistoryPage = () => {
    const languageMap = new Map<string, string>(Object.entries(languages));
    const initializeHistory = (): string[] => {
        const historyAsString: string = localStorage.getItem("history") || '';
        if (!historyAsString.trim()) {
            return [];
        } else {
            return JSON.parse(historyAsString);
        }
    };

    const [history, setHistory] = useState<string[]>(initializeHistory);

    return (
        <>
            <Header title="История" />
            <button onClick={() => {
                localStorage.removeItem('history');
                setHistory([]);
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