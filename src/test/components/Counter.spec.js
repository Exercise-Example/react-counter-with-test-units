import expect from "expect";
import jest from "jest-mock";
import React from "react";
import Adapter from "enzyme-adapter-react-16";
import { shallow, configure } from "enzyme";
import Counter from "../../components/counter";

configure({ adapter: new Adapter() });

function setup(counter = 120) {
  const actions = {
    onIncrement: jest.fn(),
    // incrementIfOdd: expect.createSpy(),
    // incrementAsync: expect.createSpy(),
    onDecrement: jest.fn()
  };
  const component = shallow(<Counter value={counter} {...actions} />);

  // console.log(component.find('button'))

  return {
    component,
    actions,
    buttons: component.find("button"),
    p: component.find("p")
  };
}

describe("components", () => {
  describe("Counter", () => {
    it("should display count", () => {
      const { p } = setup();
      expect(p.text()).toMatch(/120/);
    });

    it("first button should call increment", () => {
      const { buttons, actions } = setup();
      buttons.at(0).simulate("click");
      expect(actions.onIncrement).toHaveBeenCalled();
    });

    it("second button should call decrement", () => {
      const { buttons, actions } = setup();
      buttons.at(1).simulate("click");
      expect(actions.onDecrement).toHaveBeenCalled();
    });
  });
});
