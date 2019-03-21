/**
 * @fileoverview The database adapter.
 *
 * Defines all CRUD operations needed in order to run the server.
 */

const mysql = require('mysql2');

const {
  DB_HOST = 'mysql',
  DB_PORT = 3306,
  DB_USER = 'dev',
  DB_PASSWORD = 'dev',
  DB_DATABASE = 'dev'
} = process.env;

let connection;

/**
 * Initializes the database by creating a connection, given the credentials received
 * through env variables.
 * If any error occours, try again in 30 secs.
 * Only resolves the promise returned when it has connected successfully.
 */
const initialize = () => {
  if (connection) {
    return Promise.resolve(connection);
  }
  return new Promise((resolve, reject) => {
    try {
      connection = mysql.createConnection({
        host: DB_HOST,
        port: DB_PORT,
        user: DB_USER,
        password: DB_PASSWORD,
        database: DB_DATABASE
      });
      resolve(connection);
    } catch (err) {
      console.error(err);
      console.log('Failure connecting to the database.');
      reject(err);
    }
  });
};

/**
 * Sets up the connection in order to run a database operation.
 * Wraps the operation on a try/catch, in order to keep track of errors and
 * avoid breaking the application.
 *
 * @param {Function} operation The callback to be ran when the connection is opened.
 */
const wrapDatabaseOperation = operation => {
  return new Promise((resolve, reject) => {
    if (!connection) {
      initialize();
    }
    try {
      connection.connect(err => {
        if (err) {
          console.log('Failure connecting to the database. Trying again in 30secs...');
          setTimeout(() => initialize().then(resolve), 30000);
        } else {
          operation(connection, resolve, reject);
          connection = undefined;
        }
      });
    } catch (err) {
      console.trace(err);
      reject(err);
    }
  });
};

/**
 * Executes a query, given a set of arguments.
 * Returns a promise that, when resolved, returns the results of the query.
 * When rejected, returns the error thrown during this operation.
 *
 * @param {String!} queryStr The query string to be executed
 * @param  {...any} args The query arguments
 */
const query = (queryStr, ...args) => {
  return wrapDatabaseOperation((connection, resolve, reject) => {
    connection.query(queryStr, args, (error, results) => {
      connection.close();
      if (error) {
        console.error('Error when running query', error);
        return reject(error);
      }
      connection = undefined;
      return resolve(results);
    });
  });
};

/**
 * Executes an INSERT INTO, given a set of arguments.
 * Returns a promise that, when resolved, returns the ID of the entity created.
 * When rejected, returns the error thrown during this operation.
 *
 * @param {Object[]!} fields The fields to be inserted, where the key is the
 * column name, and the value is the column value.
 */
const create = fields => {
  return wrapDatabaseOperation((connection, resolve, reject) => {
    const columns = Object.keys(fields);
    const values = new Array(columns.length).fill('?');
    const params = Object.values(fields);

    const operationString = `INSERT INTO student (${columns.join(', ')}) VALUES (${values})`;
    connection.execute(operationString, params, error => {
      if (error) {
        console.error('Error when creating Student', error);
        return reject(error);
      }
      connection.query('SELECT LAST_INSERT_ID() as ID', (error, results) => {
        connection.close();
        if (error) {
          console.error('Error when fetching last Student inserted ID', error);
          return reject(error);
        }
        return resolve(results[0]['ID']);
      });
    });
  });
};

/**
 * Executes UPDATE, updating a single student.
 * Returns a promise that, when rejected, returns the error thrown during this operation.
 *
 * @param {Int!} id The ID of the student to be updated.
 * @param {Object[]!} fields The columns to be updated
 */
const update = (id, fields) => {
  return wrapDatabaseOperation((connection, resolve, reject) => {
    const fieldsStmt = Object.keys(fields).map(field => `${field} = ?`).join(', ');
    const params = Object.values(fields).concat(id);
    connection.execute(`UPDATE student SET ${fieldsStmt} WHERE ID = ?`, params, (error) => {
      connection.close();
      if (error) {
        console.error('Error when updating Student', error);
        return reject(error);
      }
      return resolve();
    });
  });
};

/**
 * Deletes a student by its ID from the database.
 * Returns a promise that, when rejected, returns the error thrown during this operation.
 *
 * @param {Int!} id The ID of the student to be removed
 */
const remove = id => {
  return wrapDatabaseOperation((connection, resolve, reject) => {
    connection.execute('DELETE FROM student WHERE ID = ?', [id], error => {
      connection.close();
      if (error) {
        console.error('Error when deleting Student', error);
        return reject(error);
      }
      resolve();
    });
  });
};

module.exports = {
  initialize,
  query,
  create,
  update,
  remove
};