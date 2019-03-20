const { ApolloServer, gql } = require('apollo-server');

// Mocked data until we have configured the database
let students = [
  {
    firstName: 'Douglas',
    lastName: 'Muraoka',
    birthDate: '06/21/1990',
    hobbies: ['hiking', 'camping', 'gaming'],
    photo: 'https://en.wikipedia.org/wiki/Foo_was_here#/media/File:Foo_was_here.jpg'
  }
];

/**
 * GraphQL types definitions.
 *
 * Describes what data can be fetched and mutated via this GraphQL API.
 */
const typeDefs = gql`
  type Student {
    firstName: String!
    lastName: String!
    birthDate: String!
    hobbies: [String!]
    photo: String!
  }

  type Query {
    students: [Student]
    student(studentId: String!): Student
  }

  type Mutation {
    createStudent(firstName: String!, lastName: String!, birthDate: String!, hobbies: [String!], photo: String!): Student
    updateStudent(firstName: String, lastName: String, birthDate: String, hobbies: [String!], photo: String): Student
    deleteStudent(firstName: String!, lastName: String!): Student
  }
`;

/**
 * The resolvers of our GraphQL server.
 *
 * Should contains all functions that should handle the GraphQL queries and mutations.
 */
const resolvers = {
  Query: {
    students: () => students,
    student: (parent, args) => students.find(({ firstName, lastName }) => `${lastName}_${firstName}` === args.studentId)
  },
  Mutation: {
    createStudent: (parent, args) => {
      const { firstName, lastName, birthDate, hobbies, photo } = args;
      const newStudent = {
        firstName,
        lastName,
        birthDate,
        hobbies,
        photo
      };
      students.push(newStudent);
      return newStudent;
    },
    updateStudent: (parent, args) => {
      const { firstName, lastName, birthDate, hobbies, photo } = args;
      const newStudentData = {
        firstName,
        lastName,
        birthDate,
        hobbies,
        photo
      };

      // At the moment we still don't have an ID for the student, so we'll consider the firstName + lastName
      // as its ID.
      const studentToUpdate = students.find(({ firstName, lastName }) => firstName === newStudentData.firstName && lastName === newStudentData.lastName);
      if (!studentToUpdate) {
        throw new Error('Student not found to update');
      }

      // Iterates over all attributes received from the mutation to update the student
      Object.entries(newStudentData)
        // Before updating, filters all attributes that won't be updated (i.e. its value is undefined).
        .filter(([, value]) => value !== undefined)

        // Then updates field by field.
        .forEach(([key, value]) => {
          studentToUpdate[key] = value;
        });
      return studentToUpdate;
    },
    deleteStudent: (parent, args) => {
      const { firstName, lastName } = args;
      let studentRemoved;

      // Removes the student by its firstName and lastName (since we still don't have an ID)
      students = students.filter(student => {
        if (student.firstName === firstName && student.lastName === lastName) {
          studentRemoved = student;
          return false;
        }
        return true;
      });

      // Throws an error if the student was not found
      if (!studentRemoved) {
        throw new Error('Student not found to delete');
      }
      return studentRemoved;
    }
  }
};

/**
 * Configures the ApolloServer with the type definitions and its resolvers.
 */
const server = new ApolloServer({ typeDefs, resolvers });

/**
 * Initializes the server at port 4000.
 */
server.listen(4000).then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});

module.exports = server;