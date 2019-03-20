/**
 * @fileoverview Defines and exports all Saga functions available on this application.
 */

import { all, call, fork, put, select, takeEvery, takeLatest } from 'redux-saga/effects';
import * as api from '../api';
import { createStudentDoneAction, fetchStudentsDoneAction, fetchStudentDoneAction, updateStudentDoneAction } from '../actions';
import { CREATE_STUDENT, FETCH_STUDENT, FETCH_STUDENTS, UPDATE_STUDENT } from '../actions/ActionType';

/**
 * Watches for the latest FETCH_STUDENTS action dispatched and runs the fetchStudents saga.
 */
export function* watchStudentsFetch() {
  return yield takeLatest(FETCH_STUDENTS, fetchStudents)
};

/**
 * Executed when the application initializes.
 * Fetches all students data in order to render the students list.
 * Dispatches the FETCH_STUDENT action with the students data.
 */
export function* fetchStudents() {
  const res = yield call(api.fetchStudents);
  yield put(fetchStudentsDoneAction(res));
};

/**
 * Watches for every CREATE_STUDENT action dispatched and runs the createStudent saga.
 * The createStudent saga will be invoked with the action as its argument.
 */
export function* watchStudentCreate() {
  return yield takeEvery(CREATE_STUDENT, createStudent)
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

/**
 * Watches for every FETCH_STUDENT action dispatched and runs the fetchStudent saga.
 * The fetchStudent saga will be invoked with the action as its argument.
 */
export function* watchStudentFetch() {
  return yield takeLatest(FETCH_STUDENT, fetchStudent)
};

/**
 * Fetches the data of a given studentm, by its ID.
 *
 * @param {Object} action The FETCH_STUDENT action dispatched
 * @param {Object} action.payload The studentId
 */
export function* fetchStudent({ payload: studentId }) {
  const studentFromStore = yield select(({ students }) => {
    if (students && students.data) {
      return students.data.find(({ firstName, lastName }) => `${lastName}_${firstName}` === studentId);
    }
    return null;
  });
  if (studentFromStore) {
    yield put(fetchStudentDoneAction({ data: studentFromStore }));
  } else {
    const res = yield call(api.fetchStudent, studentId);
    yield put(fetchStudentDoneAction(res));
  }
};

/**
 * Watches for every UPDATE_STUDENT action dispatched and runs the updateStudent saga.
 * The updateStudent saga will be invoked with the action as its argument.
 */
export function* watchStudentUpdate() {
  return yield takeEvery(UPDATE_STUDENT, updateStudent)
};

/**
 * Updates the student data, given the UPDATE_STUDENT action payload
 * as argument.
 *
 * @param {Object} action The UPDATE_STUDENT action dispatched
 * @param {Object} action.payload The student data to be updated
 */
export function* updateStudent({ payload: student }) {
  const res = yield call(api.updateStudent, student);
  yield put(updateStudentDoneAction(res));
};

export default function* rootSaga() {
  yield all([watchStudentsFetch, watchStudentCreate, watchStudentFetch, watchStudentUpdate].map(fork));
};