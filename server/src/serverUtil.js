/**
 * @fileoverview Contains utils for manipulating server data.
 */

/**
 * Contains all Student fields.
 */
const STUDENT_FIELDS = [
  'id',
  'firstName',
  'lastName',
  'birthDate',
  'hobbies',
  'photo'
];

/**
 * Converts the Student persisted into the expected GraphQL type.
 *
 * @param {Student} entity The Student from the database
 */
const entityToStudent = entity => STUDENT_FIELDS.reduce((acc, field) => {
  const value = entity[field.toLowerCase()];
  acc[field] = field === 'hobbies'
    ? value && JSON.parse(value)
    : value;
  return acc;
}, {});

module.exports = {
  entityToStudent
};