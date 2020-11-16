import React from "react";
import { mount, configure } from "enzyme";
import { Provider } from "react-redux";
import Adapter from "enzyme-adapter-react-16";
import { createStore, applyMiddleware } from "redux";
import Character from "./Character";
import thunk from "redux-thunk";
import { Route, MemoryRouter } from "react-router-dom";

configure({ adapter: new Adapter() });

describe("Character page", () => {
  function getCharacterWrapper(state) {
    const reducer = jest.fn().mockReturnValue(state);
    const store = createStore(reducer, applyMiddleware(thunk));
    return mount(
      <Provider store={store}>
        <MemoryRouter initialEntries={["characters/1"]}>
          <Route path="characters/:id">
            <Character />
          </Route>
        </MemoryRouter>
      </Provider>
    );
  }

  it("Render card if is fetching", () => {
    const wrapper = getCharacterWrapper({
      currentCharacter: {
        isFetching: true,
        id: 1,
        item: {},
      },
      characters: [],
    });
    expect(wrapper.exists("Spinner")).toBe(true);
    expect(wrapper.exists("CharacterCard")).toBe(false);
  });

  it("Render card if is different character", () => {
    const wrapper = getCharacterWrapper({
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

  it("Render card if is not fetching", () => {
    const wrapper = getCharacterWrapper({
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
});
