import React from "react";
import { mount, configure } from "enzyme";
import { Provider } from "react-redux";
import Adapter from "enzyme-adapter-react-16";
import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import ErrorBox from "./ErrorBox";

configure({ adapter: new Adapter() });

describe("ErrorBox", () => {
  function getErrorWrapper(state) {
    const reducer = jest.fn().mockReturnValue(state);
    const store = createStore(reducer, applyMiddleware(thunk));

    return mount(
      <Provider store={store}>
        <ErrorBox />
      </Provider>
    );
  }

  it("No render because there is no errors", () => {
    const wrapper = getErrorWrapper({});
    expect(wrapper.isEmptyRender()).toBe(true);
    expect(wrapper.exists("Alert")).toBe(false);
  });

  it("No render because there errors is empty", () => {
    const wrapper = getErrorWrapper({
      errors: [],
    });
    expect(wrapper.isEmptyRender()).toBe(true);
    expect(wrapper.exists("Alert")).toBe(false);
  });

  it("Render errors", () => {
    const wrapper = getErrorWrapper({
      errors: ["errorTest"],
    });
    expect(wrapper.isEmptyRender()).toBe(false);
    expect(wrapper.exists("Alert")).toBe(true);
  });

  //TODO Technical-doubt:
  //I must find the way to simulate onClose event and assert action is dispatched
});
