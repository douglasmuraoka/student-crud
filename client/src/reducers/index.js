/**
 * @fileoverview Module responsible for combining and exporting all reducers.
 */

import { combineReducers } from 'redux';
import students from './students';

export default combineReducers({
  students
});