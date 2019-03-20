/**
 * @fileoverview Defines and exports all the action types available on this application.
 */

/**
 * Dispatched when fetching the students list.
 */
export const FETCH_STUDENTS = 'fetch_students';

/**
 * Dispatched when done fetching the students list.
 */
export const FETCH_STUDENTS_DONE = 'fetch_students_done';

/**
 * Dispatched when the student creation form is filled and has been submitted.
 */
export const CREATE_STUDENT = 'create_student';

/**
 * Dispatched when the student creation is done. Its payload could either
 * be the student created, or an error.
 */
export const CREATE_STUDENT_DONE = 'create_student_done';

/**
 * Dispatched after the student creation is done and the user has redirected to the
 * student list. This action resets the state of the form.
 */
export const RESET_FORM = 'reset_form';

/**
 * Dispatched when the student is about to be edited and its data needs to be
 * fetched.
 */
export const FETCH_STUDENT = 'fetch_student';

/**
 * Dispatched when the API finishes fetching the student data. Its payload
 * could either be the student data, or an error.
 */
export const FETCH_STUDENT_DONE = 'fetch_student_done';

/**
 * Dispatched when the user submits the data to update the student.
 */
export const UPDATE_STUDENT = 'update_student';

/**
 * Dispatched when the API finishes updating the student data. Its payload
 * could be either the updated student data, or an error.
 */
export const UPDATE_STUDENT_DONE = 'update_student_done';

/**
 * Dispatched when the user deletes the student.
 */
export const DELETE_STUDENT = 'delete_student';

/**
 * Dispatched when the API finishes deleting the student. Its payload
 * could be either the deleted student data, or an error.
 */
export const DELETE_STUDENT_DONE = 'delete_student_done';