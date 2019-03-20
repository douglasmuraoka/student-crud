import React from 'react';
import { MemoryRouter, Route, Switch } from 'react-router-dom';
import App from '../App';
import Root from '../Root';
import StudentList from '../StudentList';
import StudentForm from '../StudentForm';
import { mount } from 'enzyme';

/**
 * Mounts the App component wrapped in a MemoryRouter,
 * allowing us to provide the path to be tested.
 *
 * @param {!String} path The router path
 */
const getRoutedApp = path => mount(
  <MemoryRouter initialEntries={[path]}><App /></MemoryRouter>
);

describe('App', () => {
  let wrapped;

  afterEach(() => {
    wrapped.unmount();
  });

  it('renders the StudentList on path "/"', () => {
    wrapped = getRoutedApp('/');
    expect(wrapped.find(Root)).toHaveLength(1);
    expect(wrapped.find(Switch)).toHaveLength(1);
    expect(wrapped.find(Route)).toHaveLength(1);
    expect(wrapped.find(StudentList)).toHaveLength(1);
  });

  it('renders the StudentForm on path "/new"', () => {
    wrapped = getRoutedApp('/new');
    expect(wrapped.find(Root)).toHaveLength(1);
    expect(wrapped.find(Switch)).toHaveLength(1);
    expect(wrapped.find(Route)).toHaveLength(2);
    expect(wrapped.find(StudentForm)).toHaveLength(1);
  });

  it('renders the StudentForm on path "/:studentId"', () => {
    wrapped = getRoutedApp('/foo');
    expect(wrapped.find(Root)).toHaveLength(1);
    expect(wrapped.find(Switch)).toHaveLength(1);
    expect(wrapped.find(Route)).toHaveLength(2);
    expect(wrapped.find(StudentForm)).toHaveLength(1);
  });
});