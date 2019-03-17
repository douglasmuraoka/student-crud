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

const CREATE_STUDENT = gql`
  mutation CreateStudent($firstName: String!, $lastName: String!, $birthDate: String!, $hobbies: [String!], $photo: String!) {
    createStudent (firstName: $firstName, lastName: $lastName, birthDate: $birthDate, hobbies: $hobbies, photo: $photo) {
      firstName
      lastName
      birthDate
      hobbies
      photo
    }
  }
`;

const UPDATE_STUDENT = gql`
  mutation UpdateStudent($firstName: String, $lastName: String, $birthDate: String, $hobbies: [String!], $photo: String) {
    updateStudent (firstName: $firstName, lastName: $lastName, birthDate: $birthDate, hobbies: $hobbies, photo: $photo) {
      firstName
      lastName
      birthDate
      hobbies
      photo
    }
  }
`;

describe('Student ApolloServer', () => {
  let query, mutate;

  before(() => {
    const testClient = createTestClient(server);
    query = testClient.query;
    mutate = testClient.mutate;
  });

  describe('list', () => {
    it('should return the list of students', async () => {
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

  describe('create', () => {
    it('should create a new student', async () => {
      const newStudent = {
        firstName: 'Robo',
        lastName: 'Cop',
        birthDate: '01/01/2000',
        hobbies: ['shooting', 'arresting', 'driving'],
        photo: 'https://vignette.wikia.nocookie.net/robocop/images/a/aa/RoboMurph1987.jpg/revision/latest?cb=20160822053647'
      };
      let res = await mutate({ mutation: CREATE_STUDENT, variables: newStudent });
      expect(res.data.createStudent).to.deep.equal(newStudent);

      res = await query({ query: GET_STUDENTS });
      expect(res.data.students).to.have.lengthOf(2);
      expect(res.data.students[1]).to.deep.equal(newStudent);
    });
  });

  describe('update', () => {
    describe('update an existing student', () => {
      it('should update only a single attribute', async () => {
        const newStudentData = {
          firstName: 'Robo',
          lastName: 'Cop',
          birthDate: '11/11/2011'
        };
        let res = await mutate({ mutation: UPDATE_STUDENT, variables: newStudentData });
        const expectedUpdatedStudent = {
          ...newStudentData,
          hobbies: ['shooting', 'arresting', 'driving'],
          photo: 'https://vignette.wikia.nocookie.net/robocop/images/a/aa/RoboMurph1987.jpg/revision/latest?cb=20160822053647'
        };
        expect(res.data.updateStudent).to.deep.equal(expectedUpdatedStudent);

        res = await query({ query: GET_STUDENTS });
        expect(res.data.students).to.have.lengthOf(2);
        expect(res.data.students[1]).to.deep.equal(expectedUpdatedStudent);
      });

      it('should update all attributes possible', async () => {
        const newStudentData = {
          firstName: 'Robo',
          lastName: 'Cop',
          birthDate: '06/06/2066',
          hobbies: ['fishing', 'hunting'],
          photo: 'https://static1.squarespace.com/static/51b3dc8ee4b051b96ceb10de/t/5c6f1cd7e4966bef3114988e/1550785755380'
        };
        let res = await mutate({ mutation: UPDATE_STUDENT, variables: newStudentData });
        expect(res.data.updateStudent).to.deep.equal(newStudentData);

        res = await query({ query: GET_STUDENTS });
        expect(res.data.students).to.have.lengthOf(2);
        expect(res.data.students[1]).to.deep.equal(newStudentData);
      });

      it('should return an error if the student was not found', async () => {
        const newStudentData = {
          firstName: 'foo',
          lastName: 'bar'
        };
        let res = await mutate({ mutation: UPDATE_STUDENT, variables: newStudentData });
        expect(res.errors).to.have.lengthOf(1);
        expect(res.errors[0].message).to.equal('Student not found to update');
      });
    });
  });
});