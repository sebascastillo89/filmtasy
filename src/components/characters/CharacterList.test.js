import React from "react";
import { mount } from "enzyme";
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import CharacterList from "./CharacterList";
import { Route, MemoryRouter } from "react-router-dom";

describe("Character List", () => {
  let wrapper;
  function mountWrapper(state, film) {
    const reducer = jest.fn().mockReturnValue(state);
    const store = createStore(reducer, applyMiddleware(thunk));

    wrapper = mount(
      <Provider store={store}>
        <MemoryRouter initialEntries={["films"]}>
          <Route path="films">
            <CharacterList film={film} />
          </Route>
        </MemoryRouter>
      </Provider>
    );
  }

  it("When is not the current film, then render Spinner", () => {
    mountWrapper(
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

  it("When is fetching characters, then render SPinner", () => {
    mountWrapper(
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

  it("When character is fetched, then render the linked name", () => {
    mountWrapper(
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
