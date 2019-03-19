/**
 * @fileoverview Exports the reducer responsible for generating the "students" state.
 *
 * Where:
 *   students: {
 *     data: [Student!]
 *     error: [GraphQLError]
 *   }
 */

import { CREATE_STUDENT_DONE, FETCH_STUDENTS } from '../actions/ActionType';

export default (state = {}, { payload, type }) => {
  const { data, error } = payload || {};
  switch (type) {
    case FETCH_STUDENTS:
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
          data: [...state.data, data],
          error
        };
      }
      return state;
    default:
      return state;
  }
};