// store.ts

import { configureStore } from '@reduxjs/toolkit';
import rootReducer from './rootReducer'; // reducers는 여러 리듀서를 합친 것입니다.

const store = configureStore({
  reducer: rootReducer,
});

export default store;
