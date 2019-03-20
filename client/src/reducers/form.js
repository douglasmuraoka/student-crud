/**
 * @fileoverview Exports the reducer responsible for generating the "form" state.
 *
 * Where:
 *   form: {
 *     isSaving?: Boolean
 *     error: [GraphQLError]
 *     selectedStudent: Student
 *   }
 *
 * isSaving is a tristate boolean. Where when undefined, it is still pristine, nothing
 * has happened yet. true when the form is currently saving the student data, and false
 * when it has finished saving.
 */

import { CREATE_STUDENT_DONE, RESET_FORM, FETCH_STUDENT_DONE, UPDATE_STUDENT_DONE } from '../actions/ActionType';

export default (state = {}, { type, payload }) => {
  const { data, error } = payload || {};
  switch (type) {
    case CREATE_STUDENT_DONE:
    case UPDATE_STUDENT_DONE:
      if (!error) {
        return { isSaving: false };
      }
      return { isSaving: false, error };
    case RESET_FORM:
      return {
        isSaving: undefined,
        selectedStudent: undefined
      };
    case FETCH_STUDENT_DONE:
      if (error) {
        return { error };
      }
      return {
        ...state,
        selectedStudent: data
      };
    default:
      return state;
  }
};