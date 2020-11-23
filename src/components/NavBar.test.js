import React from "react";
import { shallow } from "enzyme";
import NavBar from "./NavBar";

describe("NavBar", () => {
  it("When render component, then render NavBar", () => {
    const wrapper = shallow(<NavBar />);
    expect(wrapper.exists("Navbar")).toEqual(true);
  });
});
