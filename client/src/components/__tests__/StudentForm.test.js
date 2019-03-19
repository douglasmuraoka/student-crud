import React from 'react';
import { mount } from 'enzyme';
import { BrowserRouter, Link } from 'react-router-dom';
import { Form } from 'informed';
import Root from '../Root';
import StudentForm from '../StudentForm';
import StudentFormField from '../StudentFormField';

describe('StudentForm', () => {
  let wrapped;

  afterEach(() => {
    wrapped.unmount();
  });

  it('renders an empty Form without crashing', () => {
    wrapped = mount(<Root><BrowserRouter><StudentForm /></BrowserRouter></Root>);
    expect(wrapped.find(Form)).toHaveLength(1);
    expect(wrapped.find(StudentFormField)).toHaveLength(5);
  });

  it('should render errors', () => {
    const initialState = {
      form: {
        error: [
          'foo'
        ]
      }
    };
    wrapped = mount(<Root initialState={initialState}><BrowserRouter><StudentForm /></BrowserRouter></Root>);
    expect(wrapped.find(Form)).toHaveLength(1);
    expect(wrapped.find(StudentFormField)).toHaveLength(5);
    expect(wrapped.find('pre')).toHaveLength(1);
    expect(wrapped.find('pre').render().text()).toBe('foo');
  });
});