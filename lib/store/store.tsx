"use client"
import { createStore, applyMiddleware, combineReducers, Store } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import rootReducer from './reducers';
import rootSaga from './sagas/rootSaga';
import AsyncStorage from '@react-native-async-storage/async-storage';

const persistConfig = {
  key: 'root',
  storage:AsyncStorage,
  whitelist: [
    "user",
    "admin"
  ],
};
const persistedReducer = persistReducer(persistConfig, rootReducer);
const sagaMiddleware = createSagaMiddleware();
if (typeof window !== 'undefined') {
  AsyncStorage.setItem('key', 'value');
}
const store: Store = createStore(
  persistedReducer,
  applyMiddleware(sagaMiddleware)
);

sagaMiddleware.run(rootSaga);
const persistedStore = persistStore(store);



export { store, persistedStore };