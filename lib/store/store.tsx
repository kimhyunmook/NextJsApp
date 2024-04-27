import { createStore, applyMiddleware, combineReducers, Store } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import rootReducer from './reducers';
import rootSaga from './sagas/rootSaga';

// Redux Persist 설정
const persistConfig = {
  key: 'root',
  storage,
};

// Redux Persist로 감싼 루트 리듀서 생성
const persistedReducer = persistReducer(persistConfig, rootReducer);

// Saga 미들웨어 생성
const sagaMiddleware = createSagaMiddleware();

// 스토어 생성
const store: Store = createStore(
  persistedReducer,
  applyMiddleware(sagaMiddleware)
);


// Saga 미들웨어 실행
sagaMiddleware.run(rootSaga);

// Persisted 스토어 생성
const persistedStore = persistStore(store);

export { store, persistedStore };