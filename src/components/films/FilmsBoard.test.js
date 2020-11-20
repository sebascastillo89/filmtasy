import React from "react";
import { mount, configure } from "enzyme";
import { Provider } from "react-redux";
import Adapter from "enzyme-adapter-react-16";
import { createStore, applyMiddleware } from "redux";
import FilmsBoard from "./FilmsBoard";
import thunk from "redux-thunk";
import { Route, MemoryRouter } from "react-router-dom";

configure({ adapter: new Adapter() });

function getBoardWrapper(state) {
  const reducer = jest.fn().mockReturnValue(state);

  const store = createStore(reducer, applyMiddleware(thunk));
  return mount(
    <Provider store={store}>
      <MemoryRouter initialEntries={["films"]}>
        <Route path="films">
          <FilmsBoard />
        </Route>
      </MemoryRouter>
    </Provider>
  );
}

describe("FilmBoard", () => {
  describe("There are no films", () => {
    it("Empty case", () => {
      const wrapper = getBoardWrapper({
        films: {
          isFetching: false,
          isCached: false,
          items: [],
        },
      });

      expect(wrapper.text().includes("There are no films")).toEqual(true);
      expect(wrapper.exists("FilmSmallCard")).toBe(false);
    });

    it("Null case", () => {
      const wrapper = getBoardWrapper({
        films: {
          isFetching: false,
          isCached: false,
          items: null,
        },
      });

      expect(wrapper.text().includes("There are no films")).toEqual(true);
      expect(wrapper.exists("CardDeck")).toBe(false);
    });
  });
  describe("There are films", () => {
    it("Render with films", () => {
      const wrapper = getBoardWrapper({
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
      expect(wrapper.text().includes("There are no films")).toEqual(false);
      expect(wrapper.exists("CardDeck")).toBe(true);
    });
  });

  describe("Only favourites", () => {
    it("Render with films", () => {
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
      expect(wrapper.text().includes("There are no films")).toEqual(false);
      expect(wrapper.exists("CardDeck")).toBe(true);
    });
  });
});
