import React from "react";
import { mount } from "enzyme";
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import Favourites from "./Favourites";
import * as FavsHelper from "../components/helpers/FavsHelper";
import thunk from "redux-thunk";

describe("Favourites page", () => {
  let wrapper;
  let store;
  beforeEach(() => {
    const reducer = jest.fn().mockReturnValue({
      films: {
        isFetching: false,
        isCached: false,
        items: [],
      },
    });
    store = createStore(reducer, applyMiddleware(thunk));
    store.dispatch = jest.fn();
    wrapper = mount(
      <Provider store={store}>
        <Favourites />
      </Provider>
    );
  });

  it("When load this page, then render FilmsBoard", () => {
    expect(wrapper.exists("FilmsBoard")).toBe(true);
  });

  it("When clicks on button, then call clear cache helper", () => {
    window.alert = jest.fn();
    const spy = jest.spyOn(FavsHelper, "clearCache").mockImplementation();
    wrapper.find("button").simulate("click", {
      preventDefault: () => {},
      alert: (msg) => {},
    });
    expect(spy).toHaveBeenCalled();
  });

  it("When render component, then dispatch an action", () => {
    expect(store.dispatch).toHaveBeenCalledTimes(1);
  });
});
