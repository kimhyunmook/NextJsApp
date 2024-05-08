"use client"
import { all } from 'redux-saga/effects';
import { userSaga,logoutSaga, fixUserSaga } from './userSaga';
import { adminNavSaga, adminListSaga, adminNavCollectionSaga } from './adminSaga';
export default function* rootSaga() {
    yield all([
      userSaga(),
      logoutSaga(),
      fixUserSaga(),
      adminNavSaga(),
      adminNavCollectionSaga(),
      adminListSaga(),
    ]);
}