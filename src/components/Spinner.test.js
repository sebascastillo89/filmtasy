import React from "react";
import { shallow } from "enzyme";
import Spinner from "./Spinner";

describe("Spinner", () => {
  it("When render component, then render Loading message", () => {
    const wrapper = shallow(<Spinner />);
    expect(wrapper.text().includes("Loading...")).toEqual(true);
  });
});
