
import { takeLatest, call, put,all } from 'redux-saga/effects';
import { fetchUserApi, fixUserAPi, logoutAPi } from '../../api/userApi';
import { SagaIterator } from 'redux-saga';
import TYPE from '@/lib/type';

const USER_TYPE = TYPE('user');
const LOGOUT_TYPE = TYPE('logout');
const FIX_USER_TYPE = TYPE('user_fix');
function* fetchUser(body:any):SagaIterator {
  try {
    const user = yield call(fetchUserApi,body);
    if (typeof user.msg === 'string') 
        alert(user.msg);
    else  {
        window.location.href ='/';
    }
    yield put({ type: USER_TYPE.SUCCESS, payload: user });
  } catch (error:any) {
    yield put({ type: USER_TYPE.ERROR, payload: error.message });
  }
}

function* logoutUser(body:any):SagaIterator {
    try {
        const res = yield call(logoutAPi,body);
        if(!!res.ok) {
            alert('로그아웃 되었습니다.');
            window.location.href='/'
        }
        yield put({type:LOGOUT_TYPE.SUCCESS,payload:res})
    } catch(error:any) {
        yield put({type:LOGOUT_TYPE.ERROR,payload:error.message});
    }
}

function* fixUser(body:any):SagaIterator {
    try {
        const res = yield call(fixUserAPi,body);
        console.log(res);
        yield put({type:FIX_USER_TYPE.SUCCESS,payload:res})
    } catch(error:any) {
        yield put({type:FIX_USER_TYPE.ERROR,payload:error.message});
    }
}

// SAGA
export function* userSaga():SagaIterator {
    yield takeLatest(USER_TYPE.REQUEST, fetchUser)
}
export function* logoutSaga() {
    yield takeLatest(LOGOUT_TYPE.REQUEST, logoutUser)
}
export function* fixUserSaga() {
    yield takeLatest(FIX_USER_TYPE.REQUEST, fixUser)
}