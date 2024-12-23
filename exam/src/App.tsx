import {HashRouter, Route, Routes} from 'react-router-dom';

import './App.css'
import {TranslatePage} from "./pages/translate/TranslatePage.tsx";
import {HistoryPage} from "./pages/history/HistoryPage.tsx";
import {NotFoundPage} from "./pages/notFound/NotFoundPage.tsx";

function App() {
  return (
    <div className="App">
        <HashRouter>
            <Routes>
                <Route path='/' element={<TranslatePage />} />
                <Route path='/history/' element={<HistoryPage />} />
                <Route path='*' element={<NotFoundPage />}/>
            </Routes>
        </HashRouter>
    </div>
  );
}

export default App
