import React from "react";
import { shallow, configure } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import About from "./About";

configure({ adapter: new Adapter() });

describe("About page", () => {
  it("Render my name", () => {
    const wrapper = shallow(<About />);
    const result = wrapper.text().includes("Sebastián");
    expect(result).toEqual(true);
  });
});
