import * as Action from "./filmsActions";
import moxios from "moxios";
import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";

const middleware = [thunk];
const mockStore = configureMockStore(middleware);

describe("Films actions", () => {
  describe("Requesting films", () => {
    it("When request films, then not include a payload", () => {
      const action = Action.fetchAllFilmsRequest();
      expect(action).toEqual({
        type: "FETCH_ALL_FILMS_REQUEST",
      });
    });
  });

  describe("Skipping films requests", () => {
    it("When skip films request, then not include a payload", () => {
      const action = Action.fetchAllFilmsSkip();
      expect(action).toEqual({
        type: "FETCH_ALL_FILMS_SKIP",
      });
    });
  });

  describe("Fetching films successfully", () => {
    it("When fetch film successfully, then payload include films", () => {
      const action = Action.fetchAllFilmsSuccess(1);
      expect(action).toEqual({
        type: "FETCH_ALL_FILMS_SUCCESS",
        payload: { films: 1 },
      });
    });

    it("When fetch films successfully (null case), then payload include films", () => {
      const action = Action.fetchAllFilmsSuccess(null);
      expect(action).toEqual({
        type: "FETCH_ALL_FILMS_SUCCESS",
        payload: { films: null },
      });
    });

    it("When fetch films successfully (empty case), then payload include films", () => {
      const action = Action.fetchAllFilmsSuccess();
      expect(action).toEqual({
        type: "FETCH_ALL_FILMS_SUCCESS",
        payload: { films: undefined },
      });
    });
  });

  describe("Fetching films with errors", () => {
    it("When fetch films with errors, then payload is empty", () => {
      const action = Action.fetchAllFilmsFailure();
      expect(action).toEqual({
        type: "FETCH_ALL_FILMS_ERROR",
      });
    });
  });

  describe("Thunk action", () => {
    describe("Fetching all films", () => {
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
        characters: [],
      };
      const mockFilm = {
        id: 1,
        title: "Title Film 1",
        url: "http://swapi.dev/api/films/1/",
      };

      let store;
      beforeEach(() => {
        moxios.install();
        store = mockStore(initialState);
      });
      afterEach(() => {
        moxios.uninstall();
      });

      it("When API returns films, then add it to store", () => {
        jest.setTimeout(10000);
        moxios.wait(function () {
          let request = moxios.requests.mostRecent();
          request.respondWith({
            status: 200,
            response: { count: 1, results: [mockFilm] },
          });
        });

        const expectedActions = [
          {
            type: "FETCH_ALL_FILMS_REQUEST",
          },
          {
            type: "FETCH_ALL_FILMS_SUCCESS",
            payload: { films: [mockFilm] },
          },
        ];
        return store.dispatch(Action.fetchAllFilms()).then(() => {
          const actualAction = store.getActions();
          expect(actualAction).toEqual(expectedActions);
        });
      });

      it("When API returns no films (empty case), then add undefined to store", () => {
        jest.setTimeout(10000);
        moxios.wait(function () {
          let request = moxios.requests.mostRecent();
          request.respondWith({
            status: 200,
            response: {},
          });
        });

        const expectedActions = [
          {
            type: "FETCH_ALL_FILMS_REQUEST",
          },
          {
            type: "FETCH_ALL_FILMS_SUCCESS",
            payload: { films: undefined },
          },
        ];
        return store.dispatch(Action.fetchAllFilms()).then(() => {
          const actualAction = store.getActions();
          expect(actualAction).toEqual(expectedActions);
        });
      });

      it("When API returns no films (null case), then add undefined to store", () => {
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
            type: "FETCH_ALL_FILMS_REQUEST",
          },
          {
            type: "FETCH_ALL_FILMS_SUCCESS",
            payload: { films: undefined },
          },
        ];
        return store.dispatch(Action.fetchAllFilms()).then(() => {
          const actualAction = store.getActions();
          expect(actualAction).toEqual(expectedActions);
        });
      });

      it("When API returns error, then add and error to store", () => {
        jest.setTimeout(10000);
        moxios.wait(function () {
          let request = moxios.requests.mostRecent();
          request.respondWith({
            status: 500,
          });
        });

        const expectedActions = [
          {
            type: "FETCH_ALL_FILMS_REQUEST",
          },
          {
            type: "FETCH_ALL_FILMS_ERROR",
          },
          {
            type: "ADD_ERROR",
            payload: { error: "errorFetchingFilms" },
          },
        ];
        return store.dispatch(Action.fetchAllFilms()).then(() => {
          const actualAction = store.getActions();
          expect(actualAction).toEqual(expectedActions);
        });
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

      it("When films are cached, then skip requests", () => {
        jest.setTimeout(10000);

        const expectedActions = [
          {
            type: "FETCH_ALL_FILMS_REQUEST",
          },
          {
            type: "FETCH_ALL_FILMS_SKIP",
          },
        ];
        store.dispatch(Action.fetchAllFilms());
        const actualAction = store.getActions();
        expect(actualAction).toEqual(expectedActions);
      });
    });
  });
});
