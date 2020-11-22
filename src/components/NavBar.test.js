import React from "react";
import { shallow } from "enzyme";
import NavBar from "./NavBar";

jest.mock("react-i18next", () => ({
  // this mock makes sure any components using the translate hook can use it without a warning being shown
  useTranslation: () => {
    return {
      t: (str) => str,
      i18n: {
        changeLanguage: () => new Promise(() => {}),
      },
    };
  },
}));

describe("NavBar", () => {
  it("Render NavBar", () => {
    const wrapper = shallow(<NavBar />);
    expect(wrapper.exists("Navbar")).toEqual(true);
  });
});
