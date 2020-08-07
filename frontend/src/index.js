import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import {Provider} from 'react-redux';
import {persistor, store} from './helpers/store';
import NotistackWrapper from './components/home/Guidance/SnackBarWrapper.js'
import {PersistGate} from "redux-persist/integration/react";

ReactDOM.render(
    <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
            <NotistackWrapper>
                <App/>
            </NotistackWrapper>
        </PersistGate>
    </Provider>,
    document.getElementById('root')
);

serviceWorker.unregister();