/**
 * @fileoverview Exports the reducer responsible for generating the "form" state.
 *
 * Where:
 *   form: {
 *     isSaving?: Boolean
 *     error: [GraphQLError]
 *   }
 *
 * isSaving is a tristate boolean. Where when undefined, it is still pristine, nothing
 * has happened yet. true when the form is currently saving the student data, and false
 * when it has finished saving.
 */

import { CREATE_STUDENT_DONE, RESET_FORM } from '../actions/ActionType';

export default (state = {}, { type, payload }) => {
  switch (type) {
    case CREATE_STUDENT_DONE:
      const { error } = payload;
      if (!error) {
        return { isSaving: false };
      }
      return { isSaving: false, error };
    case RESET_FORM:
      return { isSaving: undefined };
    default:
      return state;
  }
};