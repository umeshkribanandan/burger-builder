import React from "react";
import { configure, shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";

import { BurgerBuilder } from "./index";
import Controls from "../../components/Burger/Controls";

configure({ adapter: new Adapter() });

describe("<BurgerBuilder />", () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<BurgerBuilder onInitIngredient={() => {}} />);
  });

  it("should render  <Controls /> when receiving ingredients ", () => {
    wrapper.setProps({ ings: { salad: 0 } });
    expect(wrapper.find(Controls)).toHaveLength(0);
  });
});
