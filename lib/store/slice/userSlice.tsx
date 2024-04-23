import { createSlice } from '@reduxjs/toolkit';
import { createAction, handleActions, combineActions } from 'redux-actions';

// const initialState = {
//     _Id:"",
//     _Name:"",
//     _PhoneNumber:"",
// };

// const userSlice = createSlice({
//   name: 'counter',
//   initialState,
//   reducers: {
//     getInfo(state,action) {
//         state = action.payload.msg;
//     },
//   },
// });

// export const { getInfo } = userSlice.actions;
// export default userSlice.reducer;

const defaultState = {
    _Id:"",
    _Name:"",
    _PhoneNumber:"",
}

const getInfoAction:any = createAction('GET_INFO');
const userInfoAction:any = createAction('USER_INFO');

const reducer = handleActions({
  [getInfoAction]: (state, { payload: { _Name, _PhoneNumber } }) => {
    return { ...state, _Name, _PhoneNumber, result: 'result' };
  },
  [userInfoAction]: (state, { payload: { _Name, _PhoneNumber } }) => {
    return { ...state, _Name, _PhoneNumber, result: 'result' };
  },
}, defaultState);
export default reducer