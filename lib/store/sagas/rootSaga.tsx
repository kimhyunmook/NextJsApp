// 루트 사가 실행
import { all } from 'redux-saga/effects';
import { userSaga,logoutSaga, fixUserSaga } from './userSaga';
export default function* rootSaga() {
    yield all([
      userSaga(),
      logoutSaga(),
      fixUserSaga(),
    ]);
}