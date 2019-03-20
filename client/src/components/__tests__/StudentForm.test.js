import React from 'react';
import { mount } from 'enzyme';
import { BrowserRouter, MemoryRouter, Route } from 'react-router-dom';
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

  describe('Editing', () => {
    it('should render selected student data', () => {
      const initialState = {
        form: {
          selectedStudent: {
            firstName: 'Douglas',
            lastName: 'Muraoka',
            birthDate: '21/06/1990',
            hobbies: [],
            photo: 'http://www.foo.bar'
          }
        }
      };
      wrapped = mount(<Root initialState={initialState}><BrowserRouter><StudentForm /></BrowserRouter></Root>);
      expect(wrapped.find(Form).prop('initialValues')).toEqual(initialState.form.selectedStudent);
    });

    it('should render a loading state while fetches student data', () => {
      wrapped = mount(<Root><MemoryRouter initialEntries={['/foo']}><Route path='/:studentId' exact><StudentForm /></Route></MemoryRouter></Root>);
      wrapped.update();
      expect(wrapped.find('pre').render().text()).toContain('Loading...');
    });
  });
});