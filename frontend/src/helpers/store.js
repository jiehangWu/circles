import {createStore, applyMiddleware} from 'redux';
import {persistStore, persistReducer} from "redux-persist";
import storage from 'redux-persist/lib/storage'
import thunkMiddleware from 'redux-thunk';
import {rootReducer} from '../reducers';
import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2'

const persistConfig = {
    key: 'root',
    storage,
    blacklist: ['socketReducer'],
    stateReconciler: autoMergeLevel2,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);


export const store = createStore(
    persistedReducer,
    applyMiddleware(
        thunkMiddleware,
    ),
);

export const persistor = persistStore(store);
