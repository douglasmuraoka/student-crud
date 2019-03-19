import reducer from '../form';
import { CREATE_STUDENT_DONE, RESET_FORM } from '../../actions/ActionType';

describe('Reducer: form', () => {
  it('should return an default state', () => {
    const state = reducer(undefined, { type: 'foo' });
    expect(state).toEqual({});
  });

  describe('CREATE_STUDENT_DONE', () => {
    it('should update the isSaving flag when the student has been created', () => {
      const payload = {
        data: { foo: 'bar' }
      };
      const state = reducer(undefined, { type: CREATE_STUDENT_DONE, payload });
      expect(state).toEqual({
        isSaving: false,
        error: undefined
      });
    });

    it('should return a state with the errors when the creation has finished', () => {
      const payload = {
        error: [new Error('foo')]
      };
      const state = reducer(undefined, { type: CREATE_STUDENT_DONE, payload });
      expect(state).toEqual({
        isSaving: false,
        error: payload.error
      });
    });
  });

  describe('RESET_FORM', () => {
    it('should reset the isSaving flag to undefined', () => {
      const state = reducer(undefined, { type: RESET_FORM });
      expect(state).toEqual({
        isSaving: undefined,
        error: undefined
      });
    });
  });
});