import React from "react";
import { mount } from "enzyme";
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import FilmCard from "./FilmCard";
import thunk from "redux-thunk";

describe("Film Card", () => {
  let wrapper;
  function mountComponent(state, filmId) {
    const reducer = jest.fn().mockReturnValue(state);
    const store = createStore(reducer, applyMiddleware(thunk));
    wrapper = mount(
      <Provider store={store}>
        <FilmCard filmId={filmId} />
      </Provider>
    );
  }

  describe("There are no films", () => {
    it("When items does not contains current film, then is empty render", () => {
      mountComponent(
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
      expect(wrapper.isEmptyRender()).toBe(true);
    });

    it("When items are empty, then is empty render", () => {
      mountComponent(
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

      expect(wrapper.isEmptyRender()).toBe(true);
    });
  });

  describe("There are films", () => {
    it("When items contains current film, then render Card", () => {
      mountComponent(
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
          characters: [{ id: 1 }],
        },
        1
      );

      expect(wrapper.exists("NotFound")).toBe(false);
      expect(wrapper.exists("Card")).toBe(true);
    });

    it("When current film does not contains character, then render empty char list", () => {
      mountComponent(
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
                characters: null,
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
      expect(wrapper.text().includes("(0)")).toBe(true);
    });
  });
});
