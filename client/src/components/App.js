/**
 * @fileoverview Main application component. Responsible for rendering the student list
 * wrapped by a component that initializes the Redux store and the Sagas.
 */

import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Root from './Root';
import StudentList from './StudentList';
import StudentForm from './StudentForm';

export default () => (
  <Root>
    <BrowserRouter>
      <Switch>
        <Route path='/' exact>
          <StudentList />
        </Route>
        <Route path='/new' exact>
          <StudentForm />
        </Route>
      </Switch>
    </BrowserRouter>
  </Root >
);