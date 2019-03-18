import React from 'react';
import App from '../App';
import Root from '../Root';
import StudentList from '../StudentList';
import { mount } from 'enzyme';

describe('App', () => {
  let wrapped;

  it('renders without crashing', () => {
    wrapped = mount(<App />);
    expect(wrapped.find(Root)).toHaveLength(1);
    expect(wrapped.find(StudentList)).toHaveLength(1);
  });
});