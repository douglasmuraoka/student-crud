import reducer from '../students';
import { CREATE_STUDENT_DONE, FETCH_STUDENTS_DONE, UPDATE_STUDENT_DONE, DELETE_STUDENT_DONE } from '../../actions/ActionType';

describe('Reducer: students', () => {
  it('should return an default state', () => {
    const state = reducer(undefined, { type: 'foo' });
    expect(state).toEqual({});
  });

  describe('FETCH_STUDENTS_DONE', () => {
    it('should return a state with the students data', () => {
      const payload = {
        data: [{ foo: 'bar' }]
      };
      const state = reducer(undefined, { type: FETCH_STUDENTS_DONE, payload });
      expect(state).toEqual({
        data: payload.data,
        error: undefined
      });
    });

    it('should return a state with the errors when fetching students data', () => {
      const payload = {
        error: [new Error('foo')]
      };
      const state = reducer(undefined, { type: FETCH_STUDENTS_DONE, payload });
      expect(state).toEqual({
        data: undefined,
        error: payload.error
      });
    });
  });

  describe('CREATE_STUDENT_DONE', () => {
    it('should append the created student into the students list', () => {
      const payload = {
        data: { lorem: 'ipsum' }
      };
      const state = reducer({ data: [{ foo: 'bar' }] }, { type: CREATE_STUDENT_DONE, payload });
      expect(state).toEqual({
        data: [{ foo: 'bar' }, { lorem: 'ipsum' }],
        error: undefined
      });
    });
  });

  describe('UPDATE_STUDENT_DONE', () => {
    it('should updated the student on the students list', () => {
      const payload = {
        data: { firstName: 'foo', lastName: 'bar', birthDate: '31/12/2999' }
      };
      const state = reducer({ data: [{ firstName: 'foo', lastName: 'bar', birthDate: '01/01/2001' }] }, { type: UPDATE_STUDENT_DONE, payload });
      expect(state).toEqual({
        data: [{ firstName: 'foo', lastName: 'bar', birthDate: '31/12/2999' }],
        error: undefined
      });
    });
  });

  describe('DELETE_STUDENT_DONE', () => {
    it('should remove the student from the students list', () => {
      const payload = {
        data: { firstName: 'foo', lastName: 'bar' }
      };
      const state = reducer({ data: [{ firstName: 'foo', lastName: 'bar' }] }, { type: DELETE_STUDENT_DONE, payload });
      expect(state).toEqual({
        data: [],
        error: undefined
      });
    });
  });
});