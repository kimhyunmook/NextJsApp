import { configureStore } from '@reduxjs/toolkit';
import rootReducer from './rootReducer'; 
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import createSagaMiddleware from "redux-saga";
import rootSaga from "./sagas/rootSaga";
import { applyMiddleware } from 'redux';

const persistConfig = {
  key: "root",
  version: 1,
  storage,
  whitelist: ["user"],
  // blacklist: ['calendar']
};

const persistedReducer = persistReducer(persistConfig, rootReducer);
const sagaMiddleware = createSagaMiddleware();
//여기 수정
const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) => [...getDefaultMiddleware(), sagaMiddleware],
})

sagaMiddleware.run(rootSaga);

export default store;
