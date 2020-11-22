import React from "react";
import { shallow } from "enzyme";
import Spinner from "./Spinner";

describe("Spinner", () => {
  it("Render spinner", () => {
    const wrapper = shallow(<Spinner />);
    expect(wrapper.text().includes("Loading...")).toEqual(true);
  });
});
