const { createTestClient } = require('apollo-server-testing');
const { expect } = require('chai');
const gql = require('graphql-tag');

const server = require('../index');

const GET_STUDENTS = gql`
  query {
    students {
      firstName
      lastName
      birthDate
      hobbies
      photo
    }
  }
`;

describe('Student ApolloServer', () => {
  let query;

  before(() => {
    query = createTestClient(server).query;
  });

  describe('list', () => {
    it('should return the list of students', async () => {
      // run query against the server and snapshot the output
      const res = await query({ query: GET_STUDENTS });
      expect(res.data.students).to.have.lengthOf(1);
      expect(res.data.students[0]).to.deep.equal({
        firstName: 'Douglas',
        lastName: 'Muraoka',
        birthDate: '06/21/1990',
        hobbies: ['hiking', 'camping', 'gaming'],
        photo: 'https://en.wikipedia.org/wiki/Foo_was_here#/media/File:Foo_was_here.jpg'
      });
    });
  });
});