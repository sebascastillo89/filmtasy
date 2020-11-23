import React from "react";
import { mount } from "enzyme";
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import CurrentCharacter from "./CurrentCharacter";
import thunk from "redux-thunk";
import { Route, MemoryRouter } from "react-router-dom";

describe("Character page", () => {
  let wrapper;
  let store;
  function mountWrapper(state) {
    const reducer = jest.fn().mockReturnValue(state);
    store = createStore(reducer, applyMiddleware(thunk));
    store.dispatch = jest.fn();
    wrapper = mount(
      <Provider store={store}>
        <MemoryRouter initialEntries={["characters/1"]}>
          <Route path="characters/:id">
            <CurrentCharacter />
          </Route>
        </MemoryRouter>
      </Provider>
    );
  }

  it("When character is fetching, then render Spinner", () => {
    mountWrapper({
      currentCharacter: {
        isFetching: true,
        id: 1,
        item: {},
      },
      characters: [],
    });
    expect(wrapper.exists("NotFound")).toBe(false);
    expect(wrapper.exists("Spinner")).toBe(true);
    expect(wrapper.exists("CharacterCard")).toBe(false);
  });

  it("When character is failure, then render NotFound Page", () => {
    mountWrapper({
      currentCharacter: {
        isFetching: false,
        isFailure: true,
        id: 1,
        item: {},
      },
      characters: [],
    });
    expect(wrapper.exists("NotFound")).toBe(true);
    expect(wrapper.exists("Spinner")).toBe(false);
    expect(wrapper.exists("CharacterCard")).toBe(false);
  });

  it("When character is not the currentCharacter, then render Spinner", () => {
    mountWrapper({
      currentCharacter: {
        isFetching: true,
        id: 2,
        item: {},
      },
      characters: [],
    });
    expect(wrapper.exists("Spinner")).toBe(true);
    expect(wrapper.exists("CharacterCard")).toBe(false);
  });

  it("When data is fetched, then render Card", () => {
    mountWrapper({
      currentCharacter: {
        isFetching: false,
        id: 1,
        item: {},
      },
      characters: [],
    });
    expect(wrapper.exists("Spinner")).toBe(false);
    expect(wrapper.exists("CharacterCard")).toBe(true);
  });

  it("When render component, then dispatch an action", () => {
    mountWrapper({
      currentCharacter: {
        isFetching: false,
        id: 1,
        item: {},
      },
      characters: [],
    });
    expect(store.dispatch).toHaveBeenCalledTimes(1);
  });
});
