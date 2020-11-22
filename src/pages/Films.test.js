import React from "react";
import { mount } from "enzyme";
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import Films from "./Films";
import thunk from "redux-thunk";

describe("Films page", () => {
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
        <Films />
      </Provider>
    );
    expect(wrapper.exists("FilmsBoard")).toBe(true);
  });
});
