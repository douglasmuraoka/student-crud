/**
 * @fileoverview Module responsible for combining and exporting all reducers.
 */

import { combineReducers } from 'redux';
import form from './form';
import students from './students';

export default combineReducers({
  form,
  students
});