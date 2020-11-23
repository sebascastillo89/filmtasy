import React from "react";
import { mount } from "enzyme";
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import ErrorBox from "./ErrorBox";

describe("ErrorBox", () => {
  let wrapper;
  let store;
  function getErrorWrapper(state) {
    const reducer = jest.fn().mockReturnValue(state);
    store = createStore(reducer, applyMiddleware(thunk));
    store.dispatch = jest.fn();
    wrapper = mount(
      <Provider store={store}>
        <ErrorBox />
      </Provider>
    );
  }
  it("When there are no errors, then is empty render (null case)", () => {
    getErrorWrapper({});
    expect(wrapper.isEmptyRender()).toBe(true);
    expect(wrapper.exists("Alert")).toBe(false);
  });

  it("When there are no errors, then is empty render (empty case)", () => {
    getErrorWrapper({
      errors: [],
    });
    expect(wrapper.isEmptyRender()).toBe(true);
    expect(wrapper.exists("Alert")).toBe(false);
  });

  it("When there are errors, then render Alert", () => {
    getErrorWrapper({
      errors: ["errorTest"],
    });
    expect(wrapper.isEmptyRender()).toBe(false);
    expect(wrapper.exists("Alert")).toBe(true);
  });

  it("When click on close alert, then dispatch an action", () => {
    getErrorWrapper({
      errors: ["errorTest"],
    });
    wrapper.find("button").simulate("click");
    expect(store.dispatch).toHaveBeenCalledTimes(1);
    expect(store.dispatch).toHaveBeenCalledWith({
      type: "REMOVE_ERROR",
      payload: { index: 0 },
    });
  });
});
