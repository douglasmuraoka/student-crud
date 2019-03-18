/**
 * @fileoverview Wrapper root component. Responsible for setting the Redux store initial state,
 * providing all its children components access to the Redux store, and defining and running
 * the Sagas.
 */

import React from 'react';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import reducer from '../reducers';
import createSagaMiddleware from 'redux-saga';
import sagas from '../sagas';

const sagaMiddleware = createSagaMiddleware();

export default ({ initialState, children }) => {
  const store = createStore(reducer, initialState, applyMiddleware(sagaMiddleware));
  sagaMiddleware.run(sagas);

  return (
    <Provider store={store} reducer={reducer}>
      {children}
    </Provider>
  );
};