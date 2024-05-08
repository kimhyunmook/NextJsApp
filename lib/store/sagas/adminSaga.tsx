
import { takeLatest, call, put, all } from 'redux-saga/effects';
import { SagaIterator } from 'redux-saga';
import { adminListApi,adminNavApi } from '@/lib/api/adminApi';
import TYPE from '@/lib/type';

const ADMIN_NAV = TYPE('admin_nav');
const ADMIN_NAV_COLLECTION = TYPE('admin_nav_collection');
const ADMIN_LIST = TYPE('admin_collection_target')
function* fetchNav(body:any):SagaIterator {
  try {
    const res = yield call(adminNavApi,body);
    res.type.includes('db') ?  
    yield put({ type: ADMIN_NAV.SUCCESS, payload: res })
    : yield put ({ type:ADMIN_NAV_COLLECTION.SUCCESS , payload: res})
  } catch (error:any) {
    yield put({ type: ADMIN_NAV.ERROR, payload: error.message });
  }
}

function* fetchList(body:any):SagaIterator {
    try {
        const res = yield call(adminListApi,body);
        yield put({type:ADMIN_LIST.SUCCESS,payload:res});
    } catch(error:any) {
        yield put({type:ADMIN_LIST.ERROR, payload:error.message})
    }
}

// SAGA
export function* adminNavSaga():SagaIterator {
  yield takeLatest(ADMIN_NAV.REQUEST, fetchNav)
}
export function* adminNavCollectionSaga():SagaIterator {
  yield takeLatest(ADMIN_NAV_COLLECTION.REQUEST, fetchNav)
}
export function* adminListSaga():SagaIterator {
    yield takeLatest(ADMIN_LIST.REQUEST,fetchList)
}