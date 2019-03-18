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