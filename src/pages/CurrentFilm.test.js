import React from "react";
import { mount } from "enzyme";
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import CurrentFilm from "./CurrentFilm";
import thunk from "redux-thunk";
import { Route, MemoryRouter } from "react-router-dom";

describe("Film page", () => {
  let wrapper;
  let store;
  function mountWrapper(state) {
    const reducer = jest.fn().mockReturnValue(state);
    store = createStore(reducer, applyMiddleware(thunk));
    store.dispatch = jest.fn();
    wrapper = mount(
      <Provider store={store}>
        <MemoryRouter initialEntries={["films/1"]}>
          <Route path="films/:id">
            <CurrentFilm />
          </Route>
        </MemoryRouter>
      </Provider>
    );
  }

  it("When current film is fetching, then render Spinner", () => {
    mountWrapper({
      films: {
        isFetching: true,
        isCached: false,
        items: [],
      },
      currentFilm: { id: 1, isFetching: true, isFailure: false },
    });
    expect(wrapper.exists("NotFound")).toBe(false);
    expect(wrapper.exists("Spinner")).toBe(true);
    expect(wrapper.exists("FilmCard")).toBe(false);
  });

  it("When film is not the currentFilm, then render Spinner", () => {
    mountWrapper({
      films: {
        isFetching: true,
        isCached: false,
        items: [],
      },
      currentFilm: { id: 2, isFetching: true },
    });

    expect(wrapper.exists("Spinner")).toBe(true);
    expect(wrapper.exists("FilmCard")).toBe(false);
  });

  it("When current film is failure, then render NotFound", () => {
    mountWrapper({
      films: {
        isFetching: true,
        isCached: false,
        items: [],
      },
      currentFilm: { id: 1, isFetching: false, isFailure: true },
    });
    expect(wrapper.exists("NotFound")).toBe(true);
    expect(wrapper.exists("Spinner")).toBe(false);
    expect(wrapper.exists("FilmCard")).toBe(false);
  });

  it("When current film is cached, then render Card", () => {
    mountWrapper({
      films: {
        isFetching: true,
        isCached: false,
        items: [],
      },
      currentFilm: { id: 1, isFetching: false, isFailure: false },
    });
    expect(wrapper.exists("NotFound")).toBe(false);
    expect(wrapper.exists("Spinner")).toBe(false);
    expect(wrapper.exists("FilmCard")).toBe(true);
  });

  it("When render component, then dispatch an action", () => {
    mountWrapper({
      films: {
        isFetching: true,
        isCached: false,
        items: [],
      },
      currentFilm: { id: 1, isFetching: false, isFailure: false },
    });
    expect(store.dispatch).toHaveBeenCalledTimes(1);
  });
});
