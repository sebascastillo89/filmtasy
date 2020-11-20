import * as Action from "./filmActions";
import moxios from "moxios";
import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";

describe("Single film actions", () => {
  describe("Requesting a film", () => {
    it("When id is specified, then the payload include the same filmId", () => {
      const action = Action.fetchFilmRequest(1);
      expect(action).toEqual({
        type: "FETCH_FILM_REQUEST",
        payload: { filmId: 1 },
      });
    });

    it("When null id is specified, then the payload include null filmId", () => {
      const action = Action.fetchFilmRequest(null);
      expect(action).toEqual({
        type: "FETCH_FILM_REQUEST",
        payload: { filmId: null },
      });
    });

    it("When empty id is specified, then the payload include undefined filmId", () => {
      const action = Action.fetchFilmRequest();
      expect(action).toEqual({
        type: "FETCH_FILM_REQUEST",
        payload: { filmId: undefined },
      });
    });
  });

  describe("Fetching film successfully", () => {
    it("When film is fetched successfully, then throw an action with no payload", () => {
      const action = Action.fetchFilmSuccess();
      expect(action).toEqual({
        type: "FETCH_FILM_SUCCESS",
      });
    });
  });

  describe("Fetching film with errors", () => {
    it("When film is fetched with errors, then throw an action with no payload", () => {
      const action = Action.fetchFilmFailure();
      expect(action).toEqual({
        type: "FETCH_FILM_ERROR",
      });
    });
  });

  describe("Skipping film request", () => {
    it("When film request is skipped, then throw an action with no payload", () => {
      const action = Action.skipFetchFilm(1);
      expect(action).toEqual({
        type: "FETCH_FILM_SKIP",
        payload: { filmId: 1 },
      });
    });
  });

  describe("Adding new film", () => {
    it("When id is specified, then payload include film", () => {
      const action = Action.addFilm(1);
      expect(action).toEqual({
        type: "ADD_FILM",
        payload: { film: 1 },
      });
    });

    it("When null id is specified, then payload include null film", () => {
      const action = Action.addFilm(null);
      expect(action).toEqual({
        type: "ADD_FILM",
        payload: { film: null },
      });
    });

    it("When empty id is specified, then payload include undefined film", () => {
      const action = Action.addFilm();
      expect(action).toEqual({
        type: "ADD_FILM",
        payload: { film: undefined },
      });
    });
  });

  describe("Thunk action", () => {
    const middleware = [thunk];
    const mockStore = configureMockStore(middleware);
    const initialState = {
      films: {
        isFetching: false,
        isCached: false,
        items: [{ id: 5 }],
      },
      currentFilm: {
        id: null,
        isFetchingFilm: false,
        isFetchingCharacters: false,
      },
      currentCharacter: { id: null, isFetching: false },
      characters: [],
    };

    const mockFilm = {
      id: 1,
      title: "Title Film 1",
      url: "http://swapi.dev/api/films/1/",
    };

    describe("Fetching a film", () => {
      let store;
      beforeEach(() => {
        moxios.install();
        store = mockStore(initialState);
      });
      afterEach(() => {
        moxios.uninstall();
      });

      it("When no-cached id is specified, then call API with successfull response, and add new film", () => {
        jest.setTimeout(10000);
        moxios.wait(function () {
          let request = moxios.requests.mostRecent();
          request.respondWith({
            status: 200,
            response: mockFilm,
          });
        });

        const expectedActions = [
          {
            type: "FETCH_FILM_REQUEST",
            payload: { filmId: 4 },
          },
          {
            type: "FETCH_FILM_SUCCESS",
          },
          {
            type: "ADD_FILM",
            payload: { film: mockFilm },
          },
        ];
        return store.dispatch(Action.fetchFilm(4)).then(() => {
          const actualAction = store.getActions();
          expect(actualAction).toEqual(expectedActions);
        });
      });

      it("When no-cached id is specified, then call API with null response, and add new film", () => {
        jest.setTimeout(10000);
        moxios.wait(function () {
          let request = moxios.requests.mostRecent();
          request.respondWith({
            status: 200,
            response: null,
          });
        });

        const expectedActions = [
          {
            type: "FETCH_FILM_REQUEST",
            payload: { filmId: 4 },
          },
          {
            type: "FETCH_FILM_SUCCESS",
          },
          {
            type: "ADD_FILM",
            payload: { film: null },
          },
        ];
        return store.dispatch(Action.fetchFilm(4)).then(() => {
          const actualAction = store.getActions();
          expect(actualAction).toEqual(expectedActions);
        });
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
            type: "FETCH_FILM_REQUEST",
            payload: { filmId: 4 },
          },
          {
            type: "ADD_ERROR",
            payload: { error: "errorFetchingFilm" },
          },
          {
            type: "FETCH_FILM_ERROR",
          },
        ];
        return store.dispatch(Action.fetchFilm(4)).then(() => {
          const actualAction = store.getActions();
          expect(actualAction).toEqual(expectedActions);
        });
      });

      it("When invalid id is specified, then add error to store", () => {
        jest.setTimeout(10000);
        const expectedActions = [
          {
            type: "ADD_ERROR",
            payload: { error: "errorFetchingFilm" },
          },
          {
            type: "FETCH_FILM_ERROR",
          },
        ];
        store.dispatch(Action.fetchFilm("invalid"));
        const actualAction = store.getActions();
        expect(actualAction).toEqual(expectedActions);
      });

      it("When empty id is specified, then add error to store", () => {
        jest.setTimeout(10000);
        const expectedActions = [
          {
            type: "ADD_ERROR",
            payload: { error: "errorFetchingFilm" },
          },
          {
            type: "FETCH_FILM_ERROR",
          },
        ];
        store.dispatch(Action.fetchFilm());
        const actualAction = store.getActions();
        expect(actualAction).toEqual(expectedActions);
      });

      it("When null id is specified, then add error to store", () => {
        jest.setTimeout(10000);
        const expectedActions = [
          {
            type: "ADD_ERROR",
            payload: { error: "errorFetchingFilm" },
          },
          {
            type: "FETCH_FILM_ERROR",
          },
        ];
        store.dispatch(Action.fetchFilm(null));
        const actualAction = store.getActions();
        expect(actualAction).toEqual(expectedActions);
      });

      it("When cached id is specified, then skip request", () => {
        jest.setTimeout(10000);

        const expectedActions = [
          {
            type: "FETCH_FILM_REQUEST",
            payload: { filmId: 5 },
          },
          {
            type: "FETCH_FILM_SKIP",
            payload: { filmId: 5 },
          },
        ];
        store.dispatch(Action.fetchFilm(5));
        const actualAction = store.getActions();
        expect(actualAction).toEqual(expectedActions);
      });
    });

    describe("Fetching cached films", () => {
      const cachedState = {
        films: {
          isFetching: false,
          isCached: true,
          items: [{ id: 5 }],
        },
        currentFilm: {
          id: null,
          isFetchingFilm: false,
          isFetchingCharacters: false,
        },
        currentCharacter: { id: null, isFetching: false },
        characters: [],
      };

      let store;
      beforeEach(() => {
        moxios.install();
        store = mockStore(cachedState);
      });
      afterEach(() => {
        moxios.uninstall();
      });

      it("Skip (cause is Cached)", () => {
        jest.setTimeout(10000);

        const expectedActions = [
          {
            type: "FETCH_FILM_REQUEST",
            payload: { filmId: 4 },
          },
          {
            type: "FETCH_FILM_SKIP",
            payload: { filmId: 4 },
          },
        ];
        store.dispatch(Action.fetchFilm(4));
        const actualAction = store.getActions();
        expect(actualAction).toEqual(expectedActions);
      });
    });
  });
});
