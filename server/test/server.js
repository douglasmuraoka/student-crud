const { createTestClient } = require('apollo-server-testing');
const gql = require('graphql-tag');
const db = require('../src/db');
const server = require('../src/server');
const sinon = require('sinon');

const GET_STUDENT = gql`
  query Student($id: Int!){
    student(id: $id) {
      id
      firstName
      lastName
      birthDate
      hobbies
      photo
    }
  }
`;

const GET_STUDENTS = gql`
  query {
    students {
      id
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
      id
      firstName
      lastName
      birthDate
      hobbies
      photo
    }
  }
`;

const UPDATE_STUDENT = gql`
  mutation UpdateStudent($id: Int!, $firstName: String, $lastName: String, $birthDate: String, $hobbies: [String!], $photo: String) {
    updateStudent (id: $id, firstName: $firstName, lastName: $lastName, birthDate: $birthDate, hobbies: $hobbies, photo: $photo) {
      id
      firstName
      lastName
      birthDate
      hobbies
      photo
    }
  }
`;

const DELETE_STUDENT = gql`
  mutation DeleteStudent($id: Int!) {
    deleteStudent (id: $id) {
      id
      firstName
      lastName
      birthDate
      hobbies
      photo
    }
  }
`;

describe('Student ApolloServer', () => {
  let query, mutate, dbMock;

  before(() => {
    const testClient = createTestClient(server);
    query = testClient.query;
    mutate = testClient.mutate;
  });

  beforeEach(() => {
    dbMock = sinon.mock(db);
  });

  describe('get', () => {
    it('should get a student by its ID', async () => {
      const id = 1;
      dbMock.expects('query').withArgs('SELECT * FROM student WHERE id = ?', id);
      await query({ query: GET_STUDENT, variables: { id } });
      dbMock.verify();
    });
  });

  describe('list', () => {
    it('should return the list of students', async () => {
      dbMock.expects('query').withArgs('SELECT * FROM student');
      await query({ query: GET_STUDENTS });
      dbMock.verify();
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
      dbMock.expects('create').withArgs(newStudent);
      await mutate({ mutation: CREATE_STUDENT, variables: newStudent });
      dbMock.verify();
    });
  });

  describe('update', () => {
    describe('update an existing student', () => {
      it('should update only a single attribute', async () => {
        const id = 1;
        const newStudentData = {
          firstName: 'Robo',
          lastName: 'Cop',
          birthDate: '11/11/2011',
          hobbies: [],
          photo: null
        };
        const mutationInput = {
          id,
          ...newStudentData
        };
        dbMock.expects('update').withArgs(1, newStudentData);
        await mutate({ mutation: UPDATE_STUDENT, variables: mutationInput });
        dbMock.verify();
      });

      it('should update all attributes possible', async () => {
        const id = 2;
        const newStudentData = {
          firstName: 'Robo',
          lastName: 'Cop',
          birthDate: '06/06/2066',
          hobbies: ['fishing', 'hunting'],
          photo: 'https://static1.squarespace.com/static/51b3dc8ee4b051b96ceb10de/t/5c6f1cd7e4966bef3114988e/1550785755380'
        };
        const mutationInput = {
          id,
          ...newStudentData
        };
        dbMock.expects('update').withArgs(2, newStudentData);
        await mutate({ mutation: UPDATE_STUDENT, variables: mutationInput });
        dbMock.verify();
      });
    });
  });

  describe('delete', () => {
    describe('delete an existing student', () => {
      it('should delete a student', async () => {
        const id = 1;
        dbMock.expects('remove').withArgs(id);
        await mutate({
          mutation: DELETE_STUDENT,
          variables: { id }
        });
        dbMock.verify();
      });
    });
  });
});