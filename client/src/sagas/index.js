/**
 * @fileoverview Defines and exports all Saga functions available on this application.
 */

import { call, fork, put, takeEvery } from 'redux-saga/effects';
import * as api from '../api';
import { createStudentDoneAction, fetchStudentsAction } from '../actions';
import { CREATE_STUDENT } from '../actions/ActionType';

/**
 * Executed when the application initializes.
 * Fetches all students data in order to render the students list.
 * Dispatches the FETCH_STUDENT action with the students data.
 */
export function* fetchStudents() {
  const res = yield call(api.fetchStudents);
  yield put(fetchStudentsAction(res));
};

/**
 * Watches for every CREATE_STUDENT action dispatched and runs the createStudent saga.
 * The createStudent saga will be invoked with the action as its argument.
 */
export function* watchStudentCreate() {
  yield takeEvery(CREATE_STUDENT, createStudent)
};

/**
 * Creates a brand new student, given the CREATE_STUDENT action payload
 * as argument.
 *
 * @param {Object} action The CREATE_STUDENT action dispatched
 * @param {Object} action.payload The student data to be persisted
 */
export function* createStudent({ payload: student }) {
  const res = yield call(api.createStudent, student);
  yield put(createStudentDoneAction(res));
};

export default function* rootSaga() {
  // Fetches the data of all students
  yield fetchStudents();

  // Then initializes the CREATE_STUDENT action watcher
  yield fork(watchStudentCreate);
};