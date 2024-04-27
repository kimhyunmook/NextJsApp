
import { combineReducers } from '@reduxjs/toolkit';
// slice
import userReducer from './userReducer';
import adminReducer from './adminReducer';

export interface IState {
  users: typeof userReducer,
}

const rootReducer = combineReducers({
  user:  userReducer,
  admin: adminReducer
});


export default rootReducer;
