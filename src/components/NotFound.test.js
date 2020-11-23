import React from "react";
import { shallow } from "enzyme";
import NotFound from "./NotFound";

describe("NotFound", () => {
  it("When render component, then show not found message", () => {
    const wrapper = shallow(<NotFound />);
    expect(wrapper.text().includes("Found, page could not be")).toBe(true);
  });
});
