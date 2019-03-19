/**
 * @fileoverview Defines and exports all the action types available on this application.
 */

/**
 * Dispatched when fetching the students list.
 */
export const FETCH_STUDENTS = 'fetch_students';

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