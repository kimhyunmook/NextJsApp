
import { combineReducers } from '@reduxjs/toolkit';
// slice
import counterReducer from './slice/counterSlice'; 
import userReducer from './slice/userSlice';

const rootReducer = combineReducers({
  counter: counterReducer,
  user:  userReducer,
  // 여기에 다른 리듀서 추가 가능
});


export default rootReducer;
