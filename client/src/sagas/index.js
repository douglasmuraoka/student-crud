/**
 * @fileoverview Defines and exports all Saga functions available on this application.
 */

import { call, fork, put } from 'redux-saga/effects';
import * as api from '../api';
import { fetchStudentsAction } from '../actions';

/**
 * Executed when the application initializes.
 * Fetches all students data in order to render the students list.
 * Dispatches the FETCH_STUDENT action with the students data.
 */
export function* fetchStudents() {
  const res = yield call(api.fetchStudents);
  yield put(fetchStudentsAction(res));
};

export default function* rootSaga() {
  yield fork(fetchStudents);
};