import React from "react";
import { mount, configure } from "enzyme";
import { Provider } from "react-redux";
import Adapter from "enzyme-adapter-react-16";
import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import CharBreadcrumb from "./CharBreadcrumb";

configure({ adapter: new Adapter() });

const mockGoBack = jest.fn();

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useHistory: () => ({
    push: jest.fn(),
    goBack: mockGoBack,
  }),
}));

function getWrapper(state, charname) {
  const reducer = jest.fn().mockReturnValue(state);
  const store = createStore(reducer, applyMiddleware(thunk));

  return mount(
    <Provider store={store}>
      <CharBreadcrumb charName={charname} />
    </Provider>
  );
}

describe("CharBreadcrumb", () => {
  it("No render name cause no film is selected", () => {
    const wrapper = getWrapper(
      {
        currentFilm: {},
        films: { items: [] },
      },
      "MyName"
    );
    expect(wrapper.isEmptyRender()).toBe(true);
    expect(wrapper.exists("Breadcrumb")).toBe(false);
  });

  it("Render breadcrumb", () => {
    const wrapper = getWrapper(
      {
        currentFilm: { id: 1 },
        films: { items: [{ id: 1, title: "MyTitle" }] },
      },
      "MyName"
    );
    expect(wrapper.isEmptyRender()).toBe(false);
    expect(wrapper.exists("Breadcrumb")).toBe(true);
  });

  it("Click film (go back)", () => {
    const wrapper = getWrapper(
      {
        currentFilm: { id: 1 },
        films: { items: [{ id: 1, title: "MyTitle" }] },
      },
      "MyName"
    );
    wrapper.find("BreadcrumbItem").at(1).simulate("click");
    expect(mockGoBack).toHaveBeenCalled();
  });
});
