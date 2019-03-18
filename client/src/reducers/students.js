/**
 * @fileoverview Exports the reducer responsible for generating the "students" state.
 *
 * Where:
 *   students: {
 *     data: [Student!]
 *     error: [GraphQLError]
 *   }
 */

import { FETCH_STUDENTS } from '../actions/ActionType';

export default (state = {}, { payload, type }) => {
  switch (type) {
    case FETCH_STUDENTS:
      const { data, error } = payload;
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
    default:
      return state;
  }
};