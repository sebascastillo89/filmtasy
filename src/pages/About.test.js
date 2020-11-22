import React from "react";
import { shallow } from "enzyme";
import About from "./About";

describe("About page", () => {
  it("Render my name", () => {
    const wrapper = shallow(<About />);
    const result = wrapper.text().includes("Sebastián");
    expect(result).toEqual(true);
  });
});
