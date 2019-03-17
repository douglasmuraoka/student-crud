const { ApolloServer, gql } = require('apollo-server');

// Mocked data until we have configured the database
const students = [
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
  },
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