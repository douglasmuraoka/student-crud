/**
 * @fileoverview Exports the reducer responsible for generating the "students" state.
 *
 * Where:
 *   students: {
 *     data: [Student!]
 *     error: [GraphQLError]
 *   }
 */

import { CREATE_STUDENT_DONE, FETCH_STUDENTS_DONE, UPDATE_STUDENT_DONE, DELETE_STUDENT_DONE } from '../actions/ActionType';

export default (state = {}, { payload, type }) => {
  const { data, error } = payload || {};
  switch (type) {
    case FETCH_STUDENTS_DONE:
      if (data) {
        return {
          ...state,
          data,
          error: undefined
        };
      }
      return {
        ...state,
        error
      }
    case CREATE_STUDENT_DONE:
      if (data) {
        return {
          data: [...(state.data || []), data],
          error
        };
      }
      return state;
    case UPDATE_STUDENT_DONE:
      if (data) {
        return {
          data: [
            ...(state.data || []).filter(({ id }) => id !== data.id),
            data
          ]
        }
      }
      return state;
    case DELETE_STUDENT_DONE:
      if (data) {
        return {
          data: [
            ...(state.data || []).filter(({ id }) => id !== data.id)
          ]
        };
      }
      return state;
    default:
      return state;
  }
};