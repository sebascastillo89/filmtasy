import React from "react";
import { mount, configure } from "enzyme";
import { Provider } from "react-redux";
import Adapter from "enzyme-adapter-react-16";
import { createStore, applyMiddleware } from "redux";
import Films from "./Films";
import thunk from "redux-thunk";

configure({ adapter: new Adapter() });

describe("Films page", () => {
  it("Store integration", () => {
    const reducer = jest.fn().mockReturnValue({
      films: {
        isFetching: false,
        isCached: false,
        items: [],
      },
    });

    const store = createStore(reducer, applyMiddleware(thunk));
    const wrapper = mount(
      <Provider store={store}>
        <Films />
      </Provider>
    );
    const [a, ...actionCalls] = reducer.mock.calls;

    expect(actionCalls).toEqual([
      [
        {
          films: {
            isFetching: false,
            isCached: false,
            items: [],
          },
        },
        { type: "FETCH_ALL_FILMS_REQUEST" },
      ],
    ]);
    expect(wrapper.text().includes("There are no films")).toEqual(true);
  });

  it("There are no films", () => {
    const reducer = jest.fn().mockReturnValue({
      films: {
        isFetching: false,
        isCached: false,
        items: [],
      },
    });

    const store = createStore(reducer, applyMiddleware(thunk));
    const wrapper = mount(
      <Provider store={store}>
        <Films />
      </Provider>
    );
    expect(wrapper.text().includes("There are no films")).toEqual(true);
  });

  it("Show spinner", () => {
    const reducer = jest.fn().mockReturnValue({
      films: {
        isFetching: true,
        isCached: false,
        items: [],
      },
    });

    const store = createStore(reducer, applyMiddleware(thunk));
    const wrapper = mount(
      <Provider store={store}>
        <Films />
      </Provider>
    );
    expect(wrapper.text().includes("Loading...")).toEqual(true);
  });

  it("Show films", () => {
    const reducer = jest.fn().mockReturnValue({
      films: {
        isFetching: false,
        isCached: false,
        items: [
          {
            title: "A New Hope",
            episode_id: 4,
            opening_crawl:
              "It is a period of civil war.\r\nRebel spaceships, striking\r\nfrom a hidden base, have won\r\ntheir first victory against\r\nthe evil Galactic Empire.\r\n\r\nDuring the battle, Rebel\r\nspies managed to steal secret\r\nplans to the Empire's\r\nultimate weapon, the DEATH\r\nSTAR, an armored space\r\nstation with enough power\r\nto destroy an entire planet.\r\n\r\nPursued by the Empire's\r\nsinister agents, Princess\r\nLeia races home aboard her\r\nstarship, custodian of the\r\nstolen plans that can save her\r\npeople and restore\r\nfreedom to the galaxy....",
            director: "George Lucas",
            producer: "Gary Kurtz, Rick McCallum",
            release_date: "1977-05-25",
            characters: [
              "http://swapi.dev/api/people/1/",
              "http://swapi.dev/api/people/2/",
            ],

            created: "2014-12-10T14:23:31.880000Z",
            edited: "2014-12-20T19:49:45.256000Z",
            url: "http://swapi.dev/api/films/1/",
          },
        ],
      },
    });

    const store = createStore(reducer, applyMiddleware(thunk));
    const wrapper = mount(
      <Provider store={store}>
        <Films />
      </Provider>
    );
    console.log(wrapper.text());
    expect(wrapper.text().includes("Show more")).toEqual(true);
  });
});
