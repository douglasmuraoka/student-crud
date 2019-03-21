/**
 * @fileoverview Main application component. Responsible for rendering the student list
 * wrapped by a component that initializes the Redux store and the Sagas.
 */

import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import Root from './Root';
import StudentList from './StudentList';
import StudentForm from './StudentForm';

export default () => (
  <Root>
    <Switch>
      <Route path='/' exact>
        <Redirect to='/student' />
      </Route>
      <Route path='/student' exact>
        <StudentList />
      </Route>
      <Route path='/student/new' exact>
        <StudentForm />
      </Route>
      <Route path='/student/:studentId' exact>
        <StudentForm />
      </Route>
    </Switch>
  </Root >
);