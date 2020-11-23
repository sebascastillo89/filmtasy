import React from "react";
import { mount } from "enzyme";
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import CharacterCard from "./CharacterCard";

describe("Character Card", () => {
  let wrapper;
  function mountWrapper(state, id) {
    const reducer = jest.fn().mockReturnValue(state);
    const store = createStore(reducer, applyMiddleware(thunk));
    wrapper = mount(
      <Provider store={store}>
        <CharacterCard characterId={id} />
      </Provider>
    );
  }

  it("When character does not exists, then is empty render", () => {
    mountWrapper(
      {
        characters: [],
      },
      "1"
    );
    expect(wrapper.isEmptyRender()).toBe(true);
  });

  it("When id is not a number, then is empty render", () => {
    mountWrapper(
      {
        characters: [],
      },
      "NaN"
    );
    expect(wrapper.isEmptyRender()).toBe(true);
  });

  it("When character exists, then render Card", () => {
    mountWrapper(
      {
        characters: [
          {
            id: 1,
            isFetching: false,
            item: {
              name: "MyName",
              height: "172",
              mass: "77",
              hair_color: "blond",
              skin_color: "fair",
              eye_color: "blue",
              birth_year: "19BBY",
              gender: "male",
            },
          },
        ],
        currentFilm: {},
      },
      "1"
    );
    expect(wrapper.exists("Card")).toBe(true);
  });
});
