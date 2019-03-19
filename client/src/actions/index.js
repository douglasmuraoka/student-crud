/**
 * @fileoverview Defines and exports all action creators.
 *
 * Action creators are functions responsible for creating an "action", which
 * is an object composed by a type and an optional payload.
 */

import {
  CREATE_STUDENT,
  CREATE_STUDENT_DONE,
  FETCH_STUDENTS,
  RESET_FORM
} from './ActionType';

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

/**
 * Creates and returns a CREATE_STUDENT action with the student data as payload.
 *
 * @param {Student} payload.data The student data to be persisted.
 */
export const createStudentAction = payload => {
  return {
    type: CREATE_STUDENT,
    payload
  };
};

/**
 * Creates and returns a CREATE_STUDENT_DONE action with either the student data
 * or an error as payload.
 *
 * @param {Student} payload.data The student data to be persisted.
 * @param {Error} payload.error Any errors thrown during the student creation.
 */
export const createStudentDoneAction = payload => {
  return {
    type: CREATE_STUDENT_DONE,
    payload
  };
};

/**
 * Creates and return a RESET_FORM action.
 */
export const resetFormAction = () => ({ type: RESET_FORM });