import * as CharacterActions from "./characterActions";
import moxios from "moxios";
import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";

const middleware = [thunk];
const mockStore = configureMockStore(middleware);
const initialState = {
  films: {
    isFetching: false,
    isCached: false,
    items: [{ id: 1, characters: [6, 7] }],
  },
  currentFilm: {
    id: null,
    isFetchingFilm: false,
    isFetchingCharacters: false,
  },
  currentCharacter: { id: null, isFetching: false },
  characters: [
    {
      id: 5,
      name: "Name Character 5",
      url: "http://swapi.dev/api/people/5/",
    },
  ],
};

const mockCharacter = {
  id: 6,
  title: "Title Character 6",
  url: "http://swapi.dev/api/people/6/",
};

describe("Thunk actions to fetch characters", () => {
  describe("Fetching a character", () => {
    let store;
    beforeEach(() => {
      moxios.install();
      store = mockStore(initialState);
    });
    afterEach(() => {
      moxios.uninstall();
    });

    it("fetchCharacter (SUCCESS)", () => {
      jest.setTimeout(10000);

      moxios.wait(function () {
        let request = moxios.requests.mostRecent();
        request.respondWith({
          status: 200,
          response: mockCharacter,
        });
      });

      const expectedActions = [
        {
          type: "FETCH_CHARACTER_REQUEST",
          payload: { characterId: 6 },
        },
        {
          type: "FETCH_CHARACTER_SUCCESS",
          payload: { characterId: 6 },
        },
        {
          type: "ADD_CHARACTER",
          payload: { characterId: 6, character: mockCharacter },
        },
      ];

      return store.dispatch(CharacterActions.fetchCharacter(6)).then(() => {
        const actualAction = store.getActions();
        expect(actualAction).toEqual(expectedActions);
      });
    });

    it("fetchCharacter (FAILURE)", () => {
      jest.setTimeout(10000);

      moxios.wait(function () {
        let request = moxios.requests.mostRecent();
        request.respondWith({
          status: 500,
          response: mockCharacter,
        });
      });

      const expectedActions = [
        {
          type: "FETCH_CHARACTER_REQUEST",
          payload: { characterId: 6 },
        },
        {
          type: "FETCH_CHARACTER_FAILURE",
          payload: {
            errorMessage: "Ups! There was an error loading character",
          },
        },
      ];

      return store.dispatch(CharacterActions.fetchCharacter(6)).then(() => {
        const actualAction = store.getActions();
        expect(actualAction).toEqual(expectedActions);
      });
    });

    it("fetchCharacter (SKIP)", () => {
      jest.setTimeout(10000);

      const expectedActions = [
        {
          type: "FETCH_CHARACTER_REQUEST",
          payload: { characterId: 5 },
        },
        {
          type: "SKIP_FETCH_CHARACTER",
        },
      ];

      store.dispatch(CharacterActions.fetchCharacter(5));
      const actualAction = store.getActions();
      expect(actualAction).toEqual(expectedActions);
    });
  });

  describe("Fetching film characters", () => {
    let store;
    beforeEach(() => {
      moxios.install();
      store = mockStore(initialState);
    });
    afterEach(() => {
      moxios.uninstall();
    });

    it("fetchCharacters (SUCCESS)", () => {
      jest.setTimeout(10000);

      moxios.wait(function () {
        let request = moxios.requests.mostRecent();
        request.respondWith({
          status: 200,
          response: mockCharacter,
        });
      });

      const expectedActions = [
        {
          type: "FETCH_CHARACTER_REQUEST",
          payload: { characterId: 6 },
        },
        {
          type: "FETCH_CHARACTER_REQUEST",
          payload: { characterId: 7 },
        },
      ];

      store.dispatch(CharacterActions.fetchCharacters(1));
      const actualAction = store.getActions();
      expect(actualAction).toEqual(expectedActions);
    });
  });
});
