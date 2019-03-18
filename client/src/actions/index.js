/**
 * @fileoverview Defines and exports all action creators.
 *
 * Action creators are functions responsible for creating an "action", which
 * is an object composed by a type and an optional payload.
 */

import { FETCH_STUDENTS } from './ActionType';

/**
 * Creates and returns a FETCH_STUDENTS action with the given payload.
 *
 * @param {Array<Student>} payload.data The array of students fetched
 * @param {Error} payload.error The error thrown when fetching data
 */
export const fetchStudentsAction = payload => {
  return {
    type: FETCH_STUDENTS,
    payload
  };
};