import React from "react";
import { configure, shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";

import NavigationItems from "./index";
import NavigationItem from "./NavItem";

configure({ adapter: new Adapter() });

describe("<NavigationItems />", () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<NavigationItems />);
  });

  it("should render two <NavigationItem /> elements if user is not logged In", () => {
    expect(wrapper.find(NavigationItem)).toHaveLength(2);
  });

  it("should render three <NavigationItem /> elements if user is  logged In", () => {
    wrapper.setProps({ isLoggedIn: true });
    expect(wrapper.find(NavigationItem)).toHaveLength(3);
  });

  it("should render logout <NavigationItem /> element if user is logged In", () => {
    wrapper.setProps({ isLoggedIn: true });
    expect(
      wrapper.contains(<NavigationItem link="/logout">Logout</NavigationItem>)
    );
  });
});
