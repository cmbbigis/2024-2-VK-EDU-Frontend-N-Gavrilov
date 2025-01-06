import { useDispatch, useSelector } from "react-redux";
import { setHistory } from "../../redux/slice";
import { RootState } from "../../redux/RootState.ts";

export const useHistoryUtils = () => {
    const dispatch = useDispatch();
    const history = useSelector((state: RootState) => state.slice.history);

    const deleteHistory = () => {
        localStorage.removeItem('history');
        dispatch(setHistory([]));
    };

    const addToHistory = (historyElement: string) => {
        const tempHistory = [...history, historyElement];
        dispatch(setHistory(tempHistory));
    };

    return { deleteHistory, addToHistory };
};