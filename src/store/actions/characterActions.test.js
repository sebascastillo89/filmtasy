import * as Action from "./characterActions";
import moxios from "moxios";
import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";

const middleware = [thunk];
const mockStore = configureMockStore(middleware);
const initialState = {
  films: {
    isFetching: false,
    isCached: false,
    items: [],
  },
  currentFilm: {
    id: null,
    isFetchingFilm: false,
    isFetchingCharacters: false,
  },
  currentCharacter: { id: null, isFetching: false },
  characters: [{ id: 2 }],
};

describe("Characters actions", () => {
  describe("Fetching film characters", () => {
    it("Request", () => {
      const action = Action.fetchFilmCharacterRequest(1);
      expect(action).toEqual({
        type: "FETCH_FILM_CHARACTER_REQUEST",
        payload: { characterId: 1 },
      });
    });

    it("Request (null case)", () => {
      const action = Action.fetchFilmCharacterRequest(null);
      expect(action).toEqual({
        type: "FETCH_FILM_CHARACTER_REQUEST",
        payload: { characterId: null },
      });
    });

    it("Request (empty case)", () => {
      const action = Action.fetchFilmCharacterRequest();
      expect(action).toEqual({
        type: "FETCH_FILM_CHARACTER_REQUEST",
        payload: { characterId: undefined },
      });
    });

    it("Success", () => {
      const action = Action.fetchFilmCharacterSuccess(1, 2);
      expect(action).toEqual({
        type: "FETCH_FILM_CHARACTER_SUCCESS",
        payload: { characterId: 1, character: 2 },
      });
    });

    it("Success (null case)", () => {
      const action = Action.fetchFilmCharacterSuccess(null, null);
      expect(action).toEqual({
        type: "FETCH_FILM_CHARACTER_SUCCESS",
        payload: { characterId: null, character: null },
      });
    });

    it("Success (empty case)", () => {
      const action = Action.fetchFilmCharacterSuccess();
      expect(action).toEqual({
        type: "FETCH_FILM_CHARACTER_SUCCESS",
        payload: { characterId: undefined, character: undefined },
      });
    });

    it("Success (one null case)", () => {
      const action = Action.fetchFilmCharacterSuccess(null);
      expect(action).toEqual({
        type: "FETCH_FILM_CHARACTER_SUCCESS",
        payload: { characterId: null, character: undefined },
      });
    });

    it("Failure", () => {
      const action = Action.fetchFilmCharacterFailure();
      expect(action).toEqual({
        type: "FETCH_FILM_CHARACTER_FAILURE",
      });
    });
  });

  describe("Fetching characters", () => {
    it("Request", () => {
      const action = Action.fetchCharacterRequest(1);
      expect(action).toEqual({
        type: "FETCH_CHARACTER_REQUEST",
        payload: { characterId: 1 },
      });
    });

    it("Request (empty case)", () => {
      const action = Action.fetchCharacterRequest();
      expect(action).toEqual({
        type: "FETCH_CHARACTER_REQUEST",
        payload: { characterId: undefined },
      });
    });

    it("Request (null case)", () => {
      const action = Action.fetchCharacterRequest(null);
      expect(action).toEqual({
        type: "FETCH_CHARACTER_REQUEST",
        payload: { characterId: null },
      });
    });

    it("Success", () => {
      const action = Action.fetchCharacterSuccess(2);
      expect(action).toEqual({
        type: "FETCH_CHARACTER_SUCCESS",
        payload: { characterId: 2 },
      });
    });

    it("Success (empty case)", () => {
      const action = Action.fetchCharacterSuccess();
      expect(action).toEqual({
        type: "FETCH_CHARACTER_SUCCESS",
        payload: { characterId: undefined },
      });
    });

    it("Success (null case)", () => {
      const action = Action.fetchCharacterSuccess(null);
      expect(action).toEqual({
        type: "FETCH_CHARACTER_SUCCESS",
        payload: { characterId: null },
      });
    });

    it("Failure", () => {
      const action = Action.fetchCharacterFailure();
      expect(action).toEqual({
        type: "FETCH_CHARACTER_FAILURE",
      });
    });

    it("Skip", () => {
      const action = Action.skipFetchCharacter();
      expect(action).toEqual({
        type: "SKIP_FETCH_CHARACTER",
      });
    });

    it("Add character", () => {
      const action = Action.addCharacter(1, "filmId");
      expect(action).toEqual({
        type: "ADD_CHARACTER",
        payload: { characterId: 1, character: "filmId" },
      });
    });
  });

  describe("Thunk actions", () => {
    describe("Thunk actions for fetch single film", () => {
      let store;
      beforeEach(() => {
        moxios.install();
        store = mockStore(initialState);
      });
      afterEach(() => {
        moxios.uninstall();
      });

      it("Success", () => {
        jest.setTimeout(10000);
        moxios.wait(function () {
          let request = moxios.requests.mostRecent();
          request.respondWith({
            status: 200,
            response: { name: "MyName" },
          });
        });

        const expectedActions = [
          {
            type: "FETCH_CHARACTER_REQUEST",
            payload: { characterId: 1 },
          },
          {
            type: "FETCH_CHARACTER_SUCCESS",
            payload: { characterId: 1 },
          },
          {
            type: "ADD_CHARACTER",
            payload: { characterId: 1, character: { name: "MyName" } },
          },
        ];
        return store.dispatch(Action.fetchCharacter(1)).then(() => {
          const actualAction = store.getActions();
          expect(actualAction).toEqual(expectedActions);
        });
      });

      it("Skip (already fetched)", () => {
        jest.setTimeout(10000);

        const expectedActions = [
          {
            type: "FETCH_CHARACTER_REQUEST",
            payload: { characterId: 2 },
          },
          {
            type: "SKIP_FETCH_CHARACTER",
          },
        ];
        store.dispatch(Action.fetchCharacter(2));
        const actualAction = store.getActions();
        expect(actualAction).toEqual(expectedActions);
      });

      it("Failure (API Error)", () => {
        jest.setTimeout(10000);
        moxios.wait(function () {
          let request = moxios.requests.mostRecent();
          request.respondWith({
            status: 500,
          });
        });

        const expectedActions = [
          {
            type: "FETCH_CHARACTER_REQUEST",
            payload: { characterId: 1 },
          },
          {
            type: "FETCH_CHARACTER_FAILURE",
          },
        ];
        return store.dispatch(Action.fetchCharacter(1)).then(() => {
          const actualAction = store.getActions();
          expect(actualAction).toEqual(expectedActions);
        });
      });

      it("Failure (invalid param)", () => {
        jest.setTimeout(10000);

        const expectedActions = [
          {
            type: "FETCH_CHARACTER_FAILURE",
          },
        ];
        store.dispatch(Action.fetchCharacter("invalid"));
        const actualAction = store.getActions();
        expect(actualAction).toEqual(expectedActions);
      });

      describe("Thunk actions for check film characters (Success)", () => {
        const fetchingCharsState = {
          films: {
            isFetching: false,
            isCached: false,
            items: [{ id: 8, characters: [2] }],
          },
          currentFilm: {
            id: 8,
            isFetchingFilm: false,
            isFetchingCharacters: true,
          },
          currentCharacter: { id: null, isFetching: false },
          characters: [{ id: 2 }],
        };

        let store;
        beforeEach(() => {
          moxios.install();
          store = mockStore(fetchingCharsState);
        });
        afterEach(() => {
          moxios.uninstall();
        });

        it("Success", () => {
          jest.setTimeout(10000);

          const expectedActions = [
            {
              type: "FETCH_FILM_CHARACTERS_SUCCESS",
              payload: { filmId: 8 },
            },
          ];
          store.dispatch(Action.checkFilmCharacters());
          const actualAction = store.getActions();
          expect(actualAction).toEqual(expectedActions);
        });
      });

      describe("Thunk actions for check film characters (skip)", () => {
        const fetchingCharsState = {
          films: {
            isFetching: false,
            isCached: false,
            items: [{ id: 8, characters: [2] }],
          },
          currentFilm: {
            id: 8,
            isFetchingFilm: false,
            isFetchingCharacters: true,
          },
          currentCharacter: { id: null, isFetching: false },
          characters: [{ id: 2, isFetching: true }],
        };

        let store;
        beforeEach(() => {
          moxios.install();
          store = mockStore(fetchingCharsState);
        });
        afterEach(() => {
          moxios.uninstall();
        });

        it("Skip", () => {
          jest.setTimeout(10000);

          const expectedActions = [];
          store.dispatch(Action.checkFilmCharacters());
          const actualAction = store.getActions();
          expect(actualAction).toEqual(expectedActions);
        });
      });
    });
  });
});
