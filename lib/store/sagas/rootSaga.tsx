"use client"
import { all } from 'redux-saga/effects';
import { userSaga,logoutSaga, fixUserSaga } from './userSaga';
import { adminNavSaga, adminListSaga } from './adminSaga';
export default function* rootSaga() {
    yield all([
      userSaga(),
      logoutSaga(),
      fixUserSaga(),
      adminNavSaga(),
      adminListSaga(),
    ]);
}