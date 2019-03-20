/**
 * @fileoverview Main application component. Responsible for rendering the student list
 * wrapped by a component that initializes the Redux store and the Sagas.
 */

import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Root from './Root';
import StudentList from './StudentList';
import StudentForm from './StudentForm';

export default () => (
  <Root>
    <Switch>
      <Route path='/' exact>
        <StudentList />
      </Route>
      <Route path='/new' exact>
        <StudentForm />
      </Route>
      <Route path='/:studentId' exact>
        <StudentForm />
      </Route>
    </Switch>
  </Root >
);