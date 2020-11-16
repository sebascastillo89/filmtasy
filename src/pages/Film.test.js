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

  it("Render spinner if is fetching", () => {
    const wrapper = getFilmWrapper({
      films: {
        isFetching: true,
        isCached: false,
        items: [],
      },
      currentFilm: { id: 1, isFetching: true },
    });
    expect(wrapper.exists("Spinner")).toBe(true);
    expect(wrapper.exists("FilmCard")).toBe(false);
  });

  it("Render spinner if is fetching", () => {
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

  it("Render card if is not fetching", () => {
    const wrapper = getFilmWrapper({
      films: {
        isFetching: true,
        isCached: false,
        items: [],
      },
      currentFilm: { id: 1, isFetching: false },
    });
    expect(wrapper.exists("Spinner")).toBe(false);
    expect(wrapper.exists("FilmCard")).toBe(true);
  });
});
