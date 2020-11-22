import React from "react";
import { mount } from "enzyme";
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import CharBreadcrumb from "./CharBreadcrumb";
import { Route, MemoryRouter } from "react-router-dom";

function getWrapper(state, charname) {
  const reducer = jest.fn().mockReturnValue(state);
  const store = createStore(reducer, applyMiddleware(thunk));

  return mount(
    <Provider store={store}>
      <MemoryRouter initialEntries={["characters/1"]}>
        <Route path="characters/:id">
          <CharBreadcrumb charName={charname} />
        </Route>
      </MemoryRouter>
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
});
