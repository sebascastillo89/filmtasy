import React from "react";
import { mount } from "enzyme";
import { Provider } from "react-redux";
import Adapter from "enzyme-adapter-react-16";
import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import CharacterList from "./CharacterList";
import { Route, MemoryRouter } from "react-router-dom";

describe("Character List", () => {
  function getListWrapper(state, film) {
    const reducer = jest.fn().mockReturnValue(state);
    const store = createStore(reducer, applyMiddleware(thunk));

    return mount(
      <Provider store={store}>
        <MemoryRouter initialEntries={["films"]}>
          <Route path="films">
            <CharacterList film={film} />
          </Route>
        </MemoryRouter>
      </Provider>
    );
  }

  it("Render spinner cause different char selected", () => {
    const wrapper = getListWrapper(
      {
        currentFilm: { id: 1 },
        characters: [{ id: 1, item: { id: 1, name: "MyName" } }],
        films: { items: [] },
      },
      { id: 2 }
    );
    expect(wrapper.exists("Spinner")).toBe(true);
    expect(wrapper.exists("CharacterLinkedName")).toBe(false);
  });

  it("Render spinner cause is fetching chars", () => {
    const wrapper = getListWrapper(
      {
        currentFilm: { id: 1, isFetchingCharacters: true },
        characters: [{ id: 1, item: { id: 1, name: "MyName" } }],
        films: { items: [] },
      },
      { id: 1 }
    );
    expect(wrapper.exists("Spinner")).toBe(true);
    expect(wrapper.exists("CharacterLinkedName")).toBe(false);
  });

  it("Render character name", () => {
    const wrapper = getListWrapper(
      {
        currentFilm: { id: 1, isFetchingCharacters: false },
        characters: [{ id: 1, item: { id: 1, name: "MyName" } }],
        films: { items: [] },
      },
      { id: 1, characters: [1] }
    );
    expect(wrapper.exists("Spinner")).toBe(false);
    expect(wrapper.exists("CharacterLinkedName")).toBe(true);
  });
});
