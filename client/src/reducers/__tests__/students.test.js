import reducer from '../students';
import { CREATE_STUDENT_DONE, FETCH_STUDENTS } from '../../actions/ActionType';

describe('Reducer: students', () => {
  it('should return an default state', () => {
    const state = reducer(undefined, { type: 'foo' });
    expect(state).toEqual({});
  });

  describe('FETCH_STUDENTS', () => {
    it('should return a state with the students data', () => {
      const payload = {
        data: [{ foo: 'bar' }]
      };
      const state = reducer(undefined, { type: FETCH_STUDENTS, payload });
      expect(state).toEqual({
        data: payload.data,
        error: undefined
      });
    });

    it('should return a state with the errors when fetching students data', () => {
      const payload = {
        error: [new Error('foo')]
      };
      const state = reducer(undefined, { type: FETCH_STUDENTS, payload });
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
});