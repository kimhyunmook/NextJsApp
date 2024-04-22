
import { combineReducers } from '@reduxjs/toolkit';
import counterReducer from './slice/counterSlice'; // 예시: 카운터 리듀서

const rootReducer = combineReducers({
  counter: counterReducer,
  // 여기에 다른 리듀서 추가 가능
});

export default rootReducer;
