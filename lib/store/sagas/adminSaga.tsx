
import { takeLatest, call, put,all } from 'redux-saga/effects';
import { SagaIterator } from 'redux-saga';
import { adminApi } from '@/lib/api/adminNavAPi';
import TYPE from '@/lib/type';

const ADMIN_NAV = TYPE('admin_nav');
const ADMIN_USER = TYPE('admin_users')
function* fetchNav(body:any):SagaIterator {
  try {
    const res = yield call(adminApi,body);
    yield put({ type: ADMIN_NAV.SUCCESS, payload: res });
  } catch (error:any) {
    yield put({ type: ADMIN_NAV.ERROR, payload: error.message });
  }
}

function* fetchUserList(body:any):SagaIterator {
    try {
        const res = yield call(adminApi,body);
        yield put({type:ADMIN_USER.SUCCESS,payload:res});
    } catch(error:any) {
        yield put({type:ADMIN_USER.ERROR, payload:error.message})
    }
}

// SAGA
export function* adminNavSaga():SagaIterator {
    yield takeLatest(ADMIN_NAV.REQUEST, fetchNav)
}
export function* adminUserSaga():SagaIterator {
    yield takeLatest(ADMIN_USER.REQUEST,fetchUserList)
}