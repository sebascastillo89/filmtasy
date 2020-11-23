import React from "react";
import { mount } from "enzyme";
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import CharBreadcrumb from "./CharBreadcrumb";
import { Route, MemoryRouter } from "react-router-dom";

describe("CharBreadcrumb", () => {
  let wrapper;
  function mountWrapper(state, charname) {
    const reducer = jest.fn().mockReturnValue(state);
    const store = createStore(reducer, applyMiddleware(thunk));

    wrapper = mount(
      <Provider store={store}>
        <MemoryRouter initialEntries={["characters/1"]}>
          <Route path="characters/:id">
            <CharBreadcrumb charName={charname} />
          </Route>
        </MemoryRouter>
      </Provider>
    );
  }

  it("When current film is not selected, then is empty render", () => {
    mountWrapper(
      {
        currentFilm: {},
        films: { items: [] },
      },
      "MyName"
    );
    expect(wrapper.isEmptyRender()).toBe(true);
  });

  it("When current film is selected, then render Breadcrumb", () => {
    mountWrapper(
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
