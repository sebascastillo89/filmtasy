import React from "react";
import { mount } from "enzyme";
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import Films from "./Films";
import thunk from "redux-thunk";

describe("Films page", () => {
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
        <Films />
      </Provider>
    );
  });

  it("When render component, then render FilmsBoard", () => {
    expect(wrapper.exists("FilmsBoard")).toBe(true);
  });

  it("When render component, then dispatch an action", () => {
    expect(store.dispatch).toHaveBeenCalledTimes(1);
  });
});
