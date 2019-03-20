/**
 * @fileoverview Side-effects and integration tests for the Sagas.
 */

import { call } from 'redux-saga/effects'
import { expectSaga } from 'redux-saga-test-plan';
import * as api from '../../api';
import * as sagas from '..';
import { createStudentAction, createStudentDoneAction, fetchStudentsDoneAction, updateStudentAction, updateStudentDoneAction } from '../../actions';

describe('sagas', () => {
  describe('fetchStudents', () => {
    it('should fetch students and dispatch FETCH_STUDENTS_DONE action', () => {
      const mockedRes = [{ foo: 'bar' }];

      expectSaga(sagas.fetchStudents)
        .provide([
          [call(api.fetchStudents), mockedRes]
        ])
        .put(fetchStudentsDoneAction(mockedRes))
        .run();
    });
  });

  describe('watchStudentCreate', () => {
    it('should watch for the CREATE_STUDENT action', () => {
      const mockedRes = { foo: 'bar' };

      expectSaga(sagas.watchStudentCreate)
        .provide([
          [call(api.createStudent), mockedRes]
        ])
        .put(createStudentDoneAction(mockedRes))
        .dispatch(createStudentAction(mockedRes))
        .run();
    });
  });

  describe('watchStudentUpdate', () => {
    it('should watch for the UPDATE_STUDENT action', () => {
      const mockedRes = { foo: 'bar' };

      expectSaga(sagas.watchStudentUpdate)
        .provide([
          [call(api.updateStudent), mockedRes]
        ])
        .put(updateStudentDoneAction(mockedRes))
        .dispatch(updateStudentAction(mockedRes))
        .run();
    });
  });
});