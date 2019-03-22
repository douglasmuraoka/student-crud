import React from 'react';
import { MemoryRouter, Switch } from 'react-router-dom';
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

  it('redirects to StudentList on path "/"', () => {
    wrapped = getRoutedApp('/');
    expect(wrapped.find(Root)).toHaveLength(1);
    expect(wrapped.find(Switch)).toHaveLength(1);
    expect(wrapped.find(StudentList)).toHaveLength(1);
  });

  it('renders the StudentList on path "/student"', () => {
    wrapped = getRoutedApp('/student');
    expect(wrapped.find(Root)).toHaveLength(1);
    expect(wrapped.find(Switch)).toHaveLength(1);
    expect(wrapped.find(StudentList)).toHaveLength(1);
  });

  it('renders the StudentForm on path "/student/new"', () => {
    wrapped = getRoutedApp('/student/new');
    expect(wrapped.find(Root)).toHaveLength(1);
    expect(wrapped.find(Switch)).toHaveLength(1);
    expect(wrapped.find(StudentForm)).toHaveLength(1);
  });

  it('renders the StudentForm on path "/student/:studentId"', () => {
    wrapped = getRoutedApp('/student/foo');
    expect(wrapped.find(Root)).toHaveLength(1);
    expect(wrapped.find(Switch)).toHaveLength(1);
    expect(wrapped.find(StudentForm)).toHaveLength(1);
  });
});