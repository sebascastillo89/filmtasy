import React from "react";
import { mount } from "enzyme";
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import FilmsBoard from "./FilmsBoard";
import thunk from "redux-thunk";
import { Route, MemoryRouter } from "react-router-dom";

describe("FilmBoard", () => {
  let wrapper;
  function mountWrapper(state) {
    const reducer = jest.fn().mockReturnValue(state);
    const store = createStore(reducer, applyMiddleware(thunk));
    wrapper = mount(
      <Provider store={store}>
        <MemoryRouter initialEntries={["films"]}>
          <Route path="films">
            <FilmsBoard />
          </Route>
        </MemoryRouter>
      </Provider>
    );
  }
  describe("Films are fetching", () => {
    it("When films are fetching, then render Spinner", () => {
      mountWrapper({
        films: {
          isFetching: true,
          isCached: false,
          items: [],
        },
      });
      expect(wrapper.exists("FilmSmallCard")).toBe(false);
      expect(wrapper.exists("Spinner")).toBe(true);
    });
  });
  describe("There are no films", () => {
    it("When there are no films (empty case), then is empty render", () => {
      mountWrapper({
        films: {
          isFetching: false,
          isCached: false,
          items: [],
        },
      });
      expect(wrapper.isEmptyRender()).toBe(true);
    });

    it("When there are no films (null case), then is empty render", () => {
      mountWrapper({
        films: {
          isFetching: false,
          isCached: false,
          items: null,
        },
      });
      expect(wrapper.isEmptyRender()).toBe(true);
    });

    it("When there are no films (undefined case), then is empty render", () => {
      mountWrapper({
        films: {
          isFetching: false,
          isCached: false,
        },
      });
      expect(wrapper.isEmptyRender()).toBe(true);
    });
  });

  describe("There are films", () => {
    it("When films are fetched, then render CardDeck", () => {
      mountWrapper({
        films: {
          isFetching: false,
          isCached: false,
          items: [
            {
              title: "title",
              episode_id: 4,
              opening_crawl: "crawl",
              director: "director",
              producer: "producer",
              release_date: "1977-05-25",
              characters: ["http://swapi.dev/api/people/1/"],
              url: "http://swapi.dev/api/films/1/",
            },
          ],
        },
      });
      expect(wrapper.exists("CardDeck")).toBe(true);
    });
  });

  describe("Show only favourites", () => {
    it("When receive onlyFav param, then render CardDeck", () => {
      const reducer = jest.fn().mockReturnValue({
        films: {
          isFetching: false,
          isCached: false,
          items: [
            {
              title: "title",
              episode_id: 4,
              opening_crawl: "crawl",
              director: "director",
              producer: "producer",
              release_date: "1977-05-25",
              characters: ["http://swapi.dev/api/people/1/"],
              url: "http://swapi.dev/api/films/1/",
            },
          ],
        },
      });
      const store = createStore(reducer, applyMiddleware(thunk));
      const wrapper = mount(
        <Provider store={store}>
          <FilmsBoard onlyFav />
        </Provider>
      );
      expect(wrapper.exists("CardDeck")).toBe(true);
    });
  });
});
