import React from "react";
import { mount } from "enzyme";
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import CharacterCard from "./CharacterCard";

describe("Character Card", () => {
  function getCardWrapper(state) {
    const reducer = jest.fn().mockReturnValue(state);
    const store = createStore(reducer, applyMiddleware(thunk));

    return mount(
      <Provider store={store}>
        <CharacterCard characterId="1" />
      </Provider>
    );
  }

  it("Not found case", () => {
    const wrapper = getCardWrapper({
      characters: [],
    });
    expect(wrapper.isEmptyRender()).toBe(true);
    expect(wrapper.exists("Card")).toBe(false);
  });

  it("Render card", () => {
    const wrapper = getCardWrapper({
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
    });
    expect(wrapper.isEmptyRender()).toBe(false);
    expect(wrapper.exists("Card")).toBe(true);
  });
});
