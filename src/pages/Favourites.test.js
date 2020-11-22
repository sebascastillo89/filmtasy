import React from "react";
import { mount } from "enzyme";
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import Favourites from "./Favourites";
import * as FavsHelper from "../components/helpers/FavsHelper";
import thunk from "redux-thunk";

describe("Favourites page", () => {
  const initialState = {
    films: {
      isFetching: false,
      isCached: false,
      items: [],
    },
  };

  it("When render component, then render FilmsBoard", () => {
    const reducer = jest.fn().mockReturnValue(initialState);
    const store = createStore(reducer, applyMiddleware(thunk));
    const wrapper = mount(
      <Provider store={store}>
        <Favourites />
      </Provider>
    );
    expect(wrapper.exists("FilmsBoard")).toBe(true);
  });

  it("When clicks on button, then call clear cache helper", () => {
    window.alert = jest.fn();
    const spy = jest.spyOn(FavsHelper, "clearCache").mockImplementation();
    const reducer = jest.fn().mockReturnValue(initialState);
    const store = createStore(reducer, applyMiddleware(thunk));
    const wrapper = mount(
      <Provider store={store}>
        <Favourites />
      </Provider>
    );

    wrapper.find("button").simulate("click", {
      preventDefault: () => {},
      alert: (msg) => {},
    });
    expect(spy).toHaveBeenCalled();
  });
});
