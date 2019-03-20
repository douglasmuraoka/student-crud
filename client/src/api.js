/**
 * @fileoverview Exports an API responsible for executing all the GraphQL queries
 * and mutations in order to do the CRUD operations.
 */

import { ApolloClient } from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { HttpLink } from 'apollo-link-http';
import gql from 'graphql-tag';

const cache = new InMemoryCache();
const link = new HttpLink({
  uri: 'http://localhost:4000/'
});
const client = new ApolloClient({ cache, link });

/**
 * Fetches the list of students persisted.
 *
 * @returns {Object} An object containing either "data" or "error" attribute.
 * If defined, "data" should be an array of students data.
 * If defined, "error" should be an array of GraphQLError.
 */
export const fetchStudents = async () => {
  const { data, errors } = await client.query({
    query: gql`
      query {
        students {
          firstName
          lastName
          birthDate
          hobbies
          photo
        }
      }
    `
  });
  if (errors) {
    return { error: errors };
  }
  return { data: data.students };
};

/**
 * Persists a brand new student and returns its data when finished with success.
 *
 * @param {String} student.firstName
 * @param {String} student.lastName
 * @param {String} student.birthDate
 * @param {String} student.hobbies
 * @param {String} student.photo
 *
 * @returns {Object} An object containing either "data" or "error" attribute.
 * If defined, "data" should be the persisted student data.
 * If defined, "error" should be an array of GraphQLError.
 */
export const createStudent = async student => {
  const { data, errors } = await client.mutate({
    mutation: gql`
    mutation CreateStudent($firstName: String!, $lastName: String!, $birthDate: String!, $hobbies: [String!], $photo: String!) {
      createStudent (firstName: $firstName, lastName: $lastName, birthDate: $birthDate, hobbies: $hobbies, photo: $photo) {
        firstName
        lastName
        birthDate
        hobbies
        photo
      }
    }
  `,
    variables: student
  });
  if (errors) {
    return { error: errors };
  }
  return { data: data.createStudent };
};

/**
 * Fetches the data of given student, by its ID.
 *
 * @returns {Object} An object containing either "data" or "error" attribute.
 * If defined, "data" should be an array of students data.
 * If defined, "error" should be an array of GraphQLError.
 */
export const fetchStudent = async studentId => {
  const { data, errors } = await client.query({
    query: gql`
      query Student($studentId: String!){
        student(studentId: $studentId) {
          firstName
          lastName
          birthDate
          hobbies
          photo
        }
      }
    `,
    variables: {
      studentId
    }
  });
  if (errors) {
    return { error: errors };
  }
  return { data: data.student };
};

/**
 * Updates the student and returns its updated data when finished with success.
 *
 * @param {String} student.firstName
 * @param {String} student.lastName
 * @param {String} student.birthDate
 * @param {String} student.hobbies
 * @param {String} student.photo
 *
 * @returns {Object} An object containing either "data" or "error" attribute.
 * If defined, "data" should be the persisted student data.
 * If defined, "error" should be an array of GraphQLError.
 */
export const updateStudent = async student => {
  const { data, errors } = await client.mutate({
    mutation: gql`
    mutation UpdateStudent($firstName: String, $lastName: String, $birthDate: String, $hobbies: [String!], $photo: String) {
      updateStudent (firstName: $firstName, lastName: $lastName, birthDate: $birthDate, hobbies: $hobbies, photo: $photo) {
        firstName
        lastName
        birthDate
        hobbies
        photo
      }
    }
  `,
    variables: student
  });
  if (errors) {
    return { error: errors };
  }
  return { data: data.updateStudent };
};

/**
 * Deletes the student and returns its data when finished with success.
 *
 * @param {String} student.firstName
 * @param {String} student.lastName
 *
 * @returns {Object} An object containing either "data" or "error" attribute.
 * If defined, "data" should be the deleted student data.
 * If defined, "error" should be an array of GraphQLError.
 */
export const deleteStudent = async student => {
  const { data, errors } = await client.mutate({
    mutation: gql`
      mutation DeleteStudent($firstName: String!, $lastName: String!) {
        deleteStudent(firstName: $firstName, lastName: $lastName) {
          firstName
          lastName
          birthDate
          hobbies
          photo
        }
      }
    `,
    variables: student
  });
  if (errors) {
    return { error: errors };
  }
  return { data: data.deleteStudent };
};