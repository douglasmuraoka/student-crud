import React from 'react';
import { mount } from 'enzyme';
import Root from '../Root';
import StudentList from '../StudentList';
import { BrowserRouter, Link } from 'react-router-dom';

describe('StudentList', () => {
  let wrapped;

  afterEach(() => {
    wrapped.unmount();
  });

  it('renders an empty list without crashing', () => {
    wrapped = mount(<Root><BrowserRouter><StudentList /></BrowserRouter></Root>);
    expect(wrapped.find('ul')).toHaveLength(1);
    expect(wrapped.find('li')).toHaveLength(0);
    expect(wrapped.find(Link)).toHaveLength(1);
  });

  it('renders students', () => {
    const initialState = {
      students: {
        data: [
          { firstName: 'Douglas', lastName: 'Muraoka' },
          { firstName: 'Ariane', lastName: 'Rodrigues' },
        ]
      }
    };
    wrapped = mount(<Root initialState={initialState}><BrowserRouter><StudentList /></BrowserRouter></Root>);
    expect(wrapped.find('ul')).toHaveLength(1);
    expect(wrapped.find('li')).toHaveLength(2);
    expect(wrapped.find(Link)).toHaveLength(1);
  });
});