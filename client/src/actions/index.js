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
  FETCH_STUDENTS_DONE,
  RESET_FORM,
  FETCH_STUDENT,
  FETCH_STUDENT_DONE,
  UPDATE_STUDENT,
  UPDATE_STUDENT_DONE,
  DELETE_STUDENT,
  DELETE_STUDENT_DONE
} from './ActionType';

/**
 * Creates and returns a FETCH_STUDENTS action with the given payload.
 */
export const fetchStudentsAction = () => {
  return {
    type: FETCH_STUDENTS
  };
};

/**
 * Creates and returns a FETCH_STUDENTS action with the given payload.
 *
 * @param {Array<Student>} payload.data The array of students fetched
 * @param {Error} payload.error The error thrown when fetching data
 */
export const fetchStudentsDoneAction = payload => {
  return {
    type: FETCH_STUDENTS_DONE,
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

/**
 * Creates and return a FETCH_STUDENT action.
 */
export const fetchStudentAction = studentId => ({ type: FETCH_STUDENT, payload: studentId });

/**
 * Creates and return a FETCH_STUDENT_DONE action.
 *
 * @param {Student} payload.data The student data fetched.
 * @param {Error} payload.error Any errors thrown during the fetch.
 */
export const fetchStudentDoneAction = payload => {
  return {
    type: FETCH_STUDENT_DONE,
    payload
  };
};

/**
 * Creates and returns a UPDATE_STUDENT action with the student data as payload.
 *
 * @param {Student} payload.data The student data to be updated.
 */
export const updateStudentAction = payload => {
  return {
    type: UPDATE_STUDENT,
    payload
  };
};

/**
 * Creates and return a UPDATE_STUDENT_DONE action.
 *
 * @param {Student} payload.data The updated student data.
 * @param {Error} payload.error Any errors thrown during the update.
 */
export const updateStudentDoneAction = payload => {
  return {
    type: UPDATE_STUDENT_DONE,
    payload
  };
};

/**
 * Creates and returns a DELETE_STUDENT action.
 *
 * @param {String} payload.data.id
 */
export const deleteStudentAction = payload => {
  return {
    type: DELETE_STUDENT,
    payload
  };
};

/**
 * Creates and return a DELETE_STUDENT_DONE action.
 *
 * @param {Student} payload.data The deleted student data.
 * @param {Error} payload.error Any errors thrown during the delete.
 */
export const deleteStudentDoneAction = payload => {
  return {
    type: DELETE_STUDENT_DONE,
    payload
  };
};