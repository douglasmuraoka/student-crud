/**
 * @fileoverview Side-effects and integration tests for the Sagas.
 */

import { call } from 'redux-saga/effects'
import { expectSaga } from 'redux-saga-test-plan';
import * as api from '../../api';
import * as sagas from '..';
import { fetchStudentsAction } from '../../actions';

describe('sagas', () => {
  describe('fetchStudents', () => {
    it('should fetch students and dispatch FETCH_STUDENTS action', () => {
      const mockedRes = [{ foo: 'bar' }];

      expectSaga(sagas.fetchStudents)
        .provide([
          [call(api.fetchStudents), mockedRes]
        ])
        .put(fetchStudentsAction(mockedRes))
        .run();
    });
  });
});