import React from "react";
import { mount, configure } from "enzyme";
import { Provider } from "react-redux";
import Adapter from "enzyme-adapter-react-16";
import { createStore, applyMiddleware } from "redux";
import Favourites from "./Favourites";
import thunk from "redux-thunk";

configure({ adapter: new Adapter() });

describe("Favourites page", () => {
  function getFilmsWrapper(state) {
    const reducer = jest.fn().mockReturnValue(state);
    const store = createStore(reducer, applyMiddleware(thunk));
    return mount(
      <Provider store={store}>
        <Favourites />
      </Provider>
    );
  }

  it("Render spinner if is fetching", () => {
    const wrapper = getFilmsWrapper({
      films: {
        isFetching: true,
        isCached: false,
        items: [],
      },
    });
    expect(wrapper.exists("Spinner")).toBe(true);
    expect(wrapper.exists("FilmsBoard")).toBe(false);
  });

  it("Render board if is not fetching", () => {
    const wrapper = getFilmsWrapper({
      films: {
        isFetching: false,
        isCached: false,
        items: [],
      },
    });
    expect(wrapper.exists("Spinner")).toBe(false);
    expect(wrapper.exists("FilmsBoard")).toBe(true);
  });
});
