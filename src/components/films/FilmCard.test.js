import React from "react";
import { mount, configure } from "enzyme";
import { Provider } from "react-redux";
import Adapter from "enzyme-adapter-react-16";
import { createStore, applyMiddleware } from "redux";
import FilmCard from "./FilmCard";
import thunk from "redux-thunk";

configure({ adapter: new Adapter() });

function getFilmCardWrapper(state, filmId) {
  const reducer = jest.fn().mockReturnValue(state);

  const store = createStore(reducer, applyMiddleware(thunk));
  return mount(
    <Provider store={store}>
      <FilmCard filmId={filmId} />
    </Provider>
  );
}

describe("Film Card", () => {
  describe("There are no films", () => {
    it("Empty case", () => {
      const wrapper = getFilmCardWrapper(
        {
          films: {
            isFetching: false,
            isCached: false,
            items: [],
          },
          currentFilm: { id: 1 },
        },
        1
      );

      expect(wrapper.exists("NotFound")).toBe(true);
      expect(wrapper.exists("Card")).toBe(false);
    });

    it("Non exists case", () => {
      const wrapper = getFilmCardWrapper(
        {
          films: {
            isFetching: false,
            isCached: false,
            items: [{ id: 2 }],
          },
          currentFilm: { id: 1 },
        },
        1
      );

      expect(wrapper.exists("NotFound")).toBe(true);
      expect(wrapper.exists("Card")).toBe(false);
    });
  });
  describe("There are films", () => {
    it("Render films and chars", () => {
      const wrapper = getFilmCardWrapper(
        {
          films: {
            isFetching: false,
            isCached: false,
            items: [
              {
                id: 1,
                title: "title",
                episode_id: 4,
                opening_crawl: "crawl",
                director: "director",
                producer: "producer",
                release_date: "1977-05-25",
                characters: [{ id: 1 }],
                url: "http://swapi.dev/api/films/1/",
              },
            ],
          },
          currentFilm: { id: 1, isFetching: false },
          characters: [{ id: 1 }],
        },
        1
      );

      expect(wrapper.exists("NotFound")).toBe(false);
      expect(wrapper.exists("Card")).toBe(true);
    });

    it("Render films with no chars", () => {
      const wrapper = getFilmCardWrapper(
        {
          films: {
            isFetching: false,
            isCached: false,
            items: [
              {
                id: 1,
                title: "title",
                episode_id: 4,
                opening_crawl: "crawl",
                director: "director",
                producer: "producer",
                release_date: "1977-05-25",
                characters: [],
                url: "http://swapi.dev/api/films/1/",
              },
            ],
          },
          currentFilm: { id: 1, isFetching: false },
          characters: [],
        },
        1
      );

      expect(wrapper.exists("NotFound")).toBe(false);
      expect(wrapper.exists("Card")).toBe(true);
    });
  });
});
