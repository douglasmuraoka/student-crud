/**
 * @fileoverview Exports and defines our GraphQL server, its types and resolvers.
 */

const { ApolloServer, gql } = require('apollo-server');
const db = require('./db');
const { entityToStudent } = require('./serverUtil');

/**
 * GraphQL types definitions.
 *
 * Describes what data can be fetched and mutated via this GraphQL API.
 */
const typeDefs = gql`
  type Student {
    id: Int!
    firstName: String!
    lastName: String!
    birthDate: String!
    hobbies: [String!]
    photo: String!
  }

  type Query {
    students: [Student]
    student(id: Int!): Student
  }

  type Mutation {
    createStudent(firstName: String!, lastName: String!, birthDate: String!, hobbies: [String!], photo: String!): Student
    updateStudent(id: Int!, firstName: String, lastName: String, birthDate: String, hobbies: [String!], photo: String): Student
    deleteStudent(id: Int!): Student
  }
`;

/**
 * The resolvers of our GraphQL server.
 *
 * Should contains all functions that should handle the GraphQL queries and mutations.
 */
const resolvers = {
  Query: {
    students: async () => {
      const results = await db.query('SELECT * FROM student');
      return results.map(entityToStudent);
    },
    student: async (parent, args) => {
      const results = await db.query('SELECT * FROM student WHERE id = ?', args.id);
      return entityToStudent(results[0]);
    }
  },
  Mutation: {
    createStudent: async (parent, args) => {
      const { firstName, lastName, birthDate, hobbies, photo } = args;
      const newStudent = {
        firstName,
        lastName,
        birthDate,
        hobbies,
        photo
      };

      const id = await db.create(newStudent);
      return { ...newStudent, id };
    },
    updateStudent: async (parent, args) => {
      const { id, firstName, lastName, birthDate, hobbies, photo } = args;
      const newStudentData = {
        firstName,
        lastName,
        birthDate,
        hobbies,
        photo
      };

      await db.update(id, newStudentData);
      return { ...newStudentData, id };
    },
    deleteStudent: async (parent, args) => {
      const results = await db.query('SELECT * FROM student WHERE id = ?', args.id);
      await db.remove(args.id);
      return entityToStudent(results[0]);
    }
  }
};

/**
 * Configures the ApolloServer with the type definitions and its resolvers.
 */
const server = new ApolloServer({ typeDefs, resolvers });

module.exports = server;