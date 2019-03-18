/**
 * @fileoverview Main application component. Responsible for rendering the student list
 * wrapped by a component that initializes the Redux store and the Sagas.
 */

import React from 'react';
import Root from './Root';
import StudentList from './StudentList';

export default () => (
  <Root>
    <StudentList />
  </Root>
);