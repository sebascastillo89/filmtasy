import * as Action from "./characterActions";
import moxios from "moxios";
import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";

describe("Characters actions", () => {
  describe("Requesting a film character", () => {
    it("When id is specified, then the payload include the same characterId", () => {
      const action = Action.fetchFilmCharacterRequest(1);
      expect(action).toEqual({
        type: "FETCH_FILM_CHARACTER_REQUEST",
        payload: { characterId: 1 },
      });
    });

    it("When null id is specified, then the payload include null characterId", () => {
      const action = Action.fetchFilmCharacterRequest(null);
      expect(action).toEqual({
        type: "FETCH_FILM_CHARACTER_REQUEST",
        payload: { characterId: null },
      });
    });

    it("When empty id is specified, then the payload include undefined characterId", () => {
      const action = Action.fetchFilmCharacterRequest();
      expect(action).toEqual({
        type: "FETCH_FILM_CHARACTER_REQUEST",
        payload: { characterId: undefined },
      });
    });
  });

  describe("Fetching a film character successfully", () => {
    it("When id and data is specified, then the payload include the same values", () => {
      const action = Action.fetchFilmCharacterSuccess(1, { name: "Luke" });
      expect(action).toEqual({
        type: "FETCH_FILM_CHARACTER_SUCCESS",
        payload: { characterId: 1, character: { name: "Luke" } },
      });
    });

    it("When null id and data is specified, then the payload include null values", () => {
      const action = Action.fetchFilmCharacterSuccess(null, null);
      expect(action).toEqual({
        type: "FETCH_FILM_CHARACTER_SUCCESS",
        payload: { characterId: null, character: null },
      });
    });

    it("When no data is specified, then the payload include undefined values", () => {
      const action = Action.fetchFilmCharacterSuccess();
      expect(action).toEqual({
        type: "FETCH_FILM_CHARACTER_SUCCESS",
        payload: { characterId: undefined, character: undefined },
      });
    });

    it("When no data is specified, then the payload include undefined value", () => {
      const action = Action.fetchFilmCharacterSuccess(3);
      expect(action).toEqual({
        type: "FETCH_FILM_CHARACTER_SUCCESS",
        payload: { characterId: 3, character: undefined },
      });
    });
  });

  describe("Fetching a film character with errors", () => {
    it("When is called, then no payload was included", () => {
      const action = Action.fetchFilmCharacterFailure();
      expect(action).toEqual({
        type: "FETCH_FILM_CHARACTER_FAILURE",
      });
    });
  });

  describe("Requesting a single character", () => {
    it("When id is specified, then the payload include the same characterId", () => {
      const action = Action.fetchCharacterRequest(1);
      expect(action).toEqual({
        type: "FETCH_CHARACTER_REQUEST",
        payload: { characterId: 1 },
      });
    });

    it("When id is not specified, then the payload include undefined characterId", () => {
      const action = Action.fetchCharacterRequest();
      expect(action).toEqual({
        type: "FETCH_CHARACTER_REQUEST",
        payload: { characterId: undefined },
      });
    });

    it("When null id is specified, then the payload include null characterId", () => {
      const action = Action.fetchCharacterRequest(null);
      expect(action).toEqual({
        type: "FETCH_CHARACTER_REQUEST",
        payload: { characterId: null },
      });
    });
  });

  describe("Fetching a single character successfully", () => {
    it("When id is specified, then the payload include the same characterId", () => {
      const action = Action.fetchCharacterSuccess(2);
      expect(action).toEqual({
        type: "FETCH_CHARACTER_SUCCESS",
        payload: { characterId: 2 },
      });
    });

    it("When id is not specified, then the payload include undefined characterId", () => {
      const action = Action.fetchCharacterSuccess();
      expect(action).toEqual({
        type: "FETCH_CHARACTER_SUCCESS",
        payload: { characterId: undefined },
      });
    });

    it("When null id is specified, then the payload include null characterId", () => {
      const action = Action.fetchCharacterSuccess(null);
      expect(action).toEqual({
        type: "FETCH_CHARACTER_SUCCESS",
        payload: { characterId: null },
      });
    });
  });

  describe("Fetching a single character with errors", () => {
    it("When is called, then no payload was included", () => {
      const action = Action.fetchCharacterFailure();
      expect(action).toEqual({
        type: "FETCH_CHARACTER_FAILURE",
      });
    });
  });

  describe("Skipping a single character request", () => {
    it("When is skipped, then no payload was included", () => {
      const action = Action.skipFetchCharacter();
      expect(action).toEqual({
        type: "SKIP_FETCH_CHARACTER",
      });
    });
  });

  describe("Adding new character to characters list", () => {
    it("When is called, then payload include charId, success and char as payload", () => {
      const action = Action.addCharacter(1, true, "filmId");
      expect(action).toEqual({
        type: "ADD_CHARACTER",
        payload: { characterId: 1, success: true, character: "filmId" },
      });
    });
  });

  describe("Thunk actions", () => {
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

    describe("Thunk actions for fetching a character", () => {
      jest.setTimeout(10000);
      let store;
      beforeEach(() => {
        moxios.install();
        store = mockStore(initialState);
      });
      afterEach(() => {
        moxios.uninstall();
      });

      it("When no-cached id is specified, then call API with successfull response, and add new character", () => {
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
            payload: {
              characterId: 1,
              success: true,
              character: { name: "MyName" },
            },
          },
        ];
        return store.dispatch(Action.fetchCharacter(1)).then(() => {
          const actualAction = store.getActions();
          expect(actualAction).toEqual(expectedActions);
        });
      });

      it("When cached id is specified, then skip this request", () => {
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

      it("When API returns error, then add error to store", () => {
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
            type: "ADD_ERROR",
            payload: { error: "errorFetchingCharacter" },
          },
          {
            type: "FETCH_CHARACTER_FAILURE",
          },
          {
            type: "ADD_CHARACTER",
            payload: { character: null, characterId: 1, success: false },
          },
        ];
        return store.dispatch(Action.fetchCharacter(1)).then(() => {
          const actualAction = store.getActions();
          expect(actualAction).toEqual(expectedActions);
        });
      });

      it("When invalid id is specified, then add error to store", () => {
        jest.setTimeout(10000);

        const expectedActions = [
          {
            type: "ADD_ERROR",
            payload: { error: "errorFetchingCharacter" },
          },
          {
            type: "FETCH_CHARACTER_FAILURE",
          },
        ];
        store.dispatch(Action.fetchCharacter("invalid"));
        const actualAction = store.getActions();
        expect(actualAction).toEqual(expectedActions);
      });
    });

    describe("Thunk actions for check film characters (all characters has been fetched)", () => {
      jest.setTimeout(10000);
      const allCharsFetchedState = {
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
        store = mockStore(allCharsFetchedState);
      });
      afterEach(() => {
        moxios.uninstall();
      });

      it("When all film characters are cached, then we dispatch this action", () => {
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

    describe("Thunk actions for check film characters (characters are fetching yet)", () => {
      jest.setTimeout(10000);
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

      it("When all film characters are not cached yet, then we dont dispatch action", () => {
        const expectedActions = [];
        store.dispatch(Action.checkFilmCharacters());
        const actualAction = store.getActions();
        expect(actualAction).toEqual(expectedActions);
      });
    });
  });
});
