import React from "react";
import { mount, configure } from "enzyme";
import { Provider } from "react-redux";
import Adapter from "enzyme-adapter-react-16";
import { createStore, applyMiddleware } from "redux";
import Film from "./Film";
import thunk from "redux-thunk";
import { Route, MemoryRouter } from "react-router-dom";

configure({ adapter: new Adapter() });

describe("Film page", () => {
  function getFilmWrapper(state) {
    const reducer = jest.fn().mockReturnValue(state);
    const store = createStore(reducer, applyMiddleware(thunk));

    return mount(
      <Provider store={store}>
        <MemoryRouter initialEntries={["films/1"]}>
          <Route path="films/:id">
            <Film />
          </Route>
        </MemoryRouter>
      </Provider>
    );
  }

  it("Render spinner", () => {
    const wrapper = getFilmWrapper({
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

  it("Render spinner if is different user", () => {
    const wrapper = getFilmWrapper({
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

  it("Render not found", () => {
    const wrapper = getFilmWrapper({
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

  it("Render card if is not fetching", () => {
    const wrapper = getFilmWrapper({
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
});
