import React from "react";
import { mount } from "enzyme";
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import CharacterLinkedName from "./CharacterLinkedName";
import { Route, MemoryRouter } from "react-router-dom";

describe("Character Card", () => {
  let wrapper;
  function mountWrapper(state) {
    const reducer = jest.fn().mockReturnValue(state);
    const store = createStore(reducer, applyMiddleware(thunk));
    wrapper = mount(
      <Provider store={store}>
        <MemoryRouter initialEntries={["films/1"]}>
          <Route path="films/:id">
            <CharacterLinkedName characterId="1" />
          </Route>
        </MemoryRouter>
      </Provider>
    );
  }

  it("When characters does not exists, then is empty render", () => {
    mountWrapper({
      characters: [],
    });
    expect(wrapper.isEmptyRender()).toBe(true);
    expect(wrapper.exists("a")).toBe(false);
  });

  it("When characters exists, then render a link name", () => {
    mountWrapper({
      characters: [{ id: 1, item: { name: "MyName" } }],
    });
    expect(wrapper.isEmptyRender()).toBe(false);
    expect(wrapper.exists("a")).toBe(true);
    expect(wrapper.find("a").at(0).props().href).toBe("/characters/1");
  });
});
