import React from 'react';
import { mount } from 'enzyme';
import Root from '../Root';
import StudentList from '../StudentList';

describe('StudentList', () => {
  let wrapped;

  afterEach(() => {
    wrapped.unmount();
  });

  it('renders an empty list without crashing', () => {
    wrapped = mount(<Root><StudentList /></Root>);
    expect(wrapped.find('ul')).toHaveLength(1);
    expect(wrapped.find('li')).toHaveLength(0);
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
    wrapped = mount(<Root initialState={initialState}><StudentList /></Root>);
    expect(wrapped.find('ul')).toHaveLength(1);
    expect(wrapped.find('li')).toHaveLength(2);
  });
});