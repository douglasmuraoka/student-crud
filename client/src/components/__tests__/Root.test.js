import React from 'react';
import { mount } from 'enzyme';
import Root from '../Root';
import { Provider } from 'react-redux';

describe('Root', () => {
  let wrapped;

  afterEach(() => {
    wrapped.unmount();
  });

  it('renders a Provider component', () => {
    wrapped = mount(<Root />);
    expect(wrapped.find(Provider)).toHaveLength(1);
  });

  it('renders a child component', () => {
    wrapped = mount(<Root><pre>foo</pre></Root>);

    const childComponent = wrapped.find('pre');
    expect(childComponent).toHaveLength(1);
    expect(childComponent.render().text()).toBe('foo');
  });
});