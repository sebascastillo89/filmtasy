import React from "react";
import { shallow, configure } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import NavBar from "./NavBar";

configure({ adapter: new Adapter() });

describe("NavBar", () => {
  it("Render NavBar", () => {
    const wrapper = shallow(<NavBar />);
    expect(wrapper.exists("Navbar")).toEqual(true);
  });
});
