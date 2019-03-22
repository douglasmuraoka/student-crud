import React from 'react';
import { mount } from 'enzyme';
import Root from '../Root';
import StudentList from '../StudentList';
import Card from '../Card';
import { BrowserRouter, Link } from 'react-router-dom';
import { Row, Col, Button } from 'react-materialize';

describe('StudentList', () => {
  let wrapped;

  afterEach(() => {
    wrapped.unmount();
  });

  it('renders an empty list without crashing', () => {
    wrapped = mount(<Root><BrowserRouter><StudentList /></BrowserRouter></Root>);
    expect(wrapped.find(Row)).toHaveLength(1);
    expect(wrapped.find(Col)).toHaveLength(1);
    expect(wrapped.find(Card)).toHaveLength(0);
    expect(wrapped.find(Button)).toHaveLength(1);
  });

  it('renders students', () => {
    const initialState = {
      students: {
        data: [
          { id: 1, firstName: 'Douglas', lastName: 'Muraoka', hobbies: ['coding', 'running', 'hiking'], photo: 'foo' },
          { id: 2, firstName: 'Ariane', lastName: 'Rodrigues', hobbies: ['fishing', 'dancing', 'hiking'], photo: 'bar' },
        ]
      }
    };
    wrapped = mount(<Root initialState={initialState}><BrowserRouter><StudentList /></BrowserRouter></Root>);
    expect(wrapped.find(Row)).toHaveLength(1);
    expect(wrapped.find(Col)).toHaveLength(1);
    expect(wrapped.find(Card)).toHaveLength(2);
    expect(wrapped.find(Button)).toHaveLength(1);
  });
});