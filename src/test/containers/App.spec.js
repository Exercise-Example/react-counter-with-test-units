import expect from 'expect';
import React from 'react';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import App from '../../containers/counter';
import Adapter from 'enzyme-adapter-react-16';
import { shallow, configure } from 'enzyme';
import configureStore from '../../store/configureStore';

configure({adapter: new Adapter()});

function setup(initialState) {
  const store = configureStore(initialState);
  const app = mount(
    <Provider store= {store}>
      <App />
    </Provider>
  );
  return {
    app,
    buttons: app.find('button'),
    p: app.find('p')
  };
}

describe('containers', () => {
  describe('App', () => {
    it('should display initial count', () => {
      const { p } = setup();
      expect(p.text()).toMatch(/120/);
    });

    it('should display updated count after increment button click', () => {
      const { buttons, p } = setup();
      buttons.at(0).simulate('click');
      expect(p.text()).toMatch(/121/);
    });

    it('should display updated count after decrement button click', () => {
      const { buttons, p } = setup();
      buttons.at(1).simulate('click');
      expect(p.text()).toMatch(/119/);
    });
  });
});
