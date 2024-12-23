import {HashRouter} from 'react-router-dom';
import React from "react";

import './App.scss';
import {Bounce, ToastContainer} from "react-toastify";
import {Provider} from "react-redux";
import {store} from "./redux/store";
import {AppRoutes} from "./components/routes/appRoutes";

function App() {
    return (
        <Provider store={store}>
            <div className="App">
                <HashRouter future={{ v7_startTransition: true }}>
                    <AppRoutes />
                </HashRouter>
                <ToastContainer
                    position="bottom-right"
                    autoClose={5000}
                    hideProgressBar={false}
                    newestOnTop={false}
                    closeOnClick
                    rtl={false}
                    pauseOnFocusLoss
                    pauseOnHover
                    theme="light"
                    transition={Bounce}
                />
            </div>
        </Provider>
    );
}

export default App;
