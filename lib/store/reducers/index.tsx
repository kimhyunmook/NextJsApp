
import { combineReducers } from '@reduxjs/toolkit';
// slice
import userReducer from './userReducer';

export interface IState {
  users: typeof userReducer,
}

const rootReducer = combineReducers({
  user:  userReducer,
});


export default rootReducer;
