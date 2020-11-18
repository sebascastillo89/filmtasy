import * as Action from "./filmsActions";
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
  characters: [],
};
const mockFilm = {
  id: 1,
  title: "Title Film 1",
  url: "http://swapi.dev/api/films/1/",
};

describe("Films actions", () => {
  describe("Fetching films", () => {
    it("Request", () => {
      const action = Action.fetchAllFilmsRequest();
      expect(action).toEqual({
        type: "FETCH_ALL_FILMS_REQUEST",
      });
    });

    it("Skip", () => {
      const action = Action.fetchAllFilmsSkip();
      expect(action).toEqual({
        type: "FETCH_ALL_FILMS_SKIP",
      });
    });

    it("Success", () => {
      const action = Action.fetchAllFilmsSuccess(1);
      expect(action).toEqual({
        type: "FETCH_ALL_FILMS_SUCCESS",
        payload: { films: 1 },
      });
    });

    it("Success (null case)", () => {
      const action = Action.fetchAllFilmsSuccess(null);
      expect(action).toEqual({
        type: "FETCH_ALL_FILMS_SUCCESS",
        payload: { films: null },
      });
    });

    it("Success (empty case)", () => {
      const action = Action.fetchAllFilmsSuccess();
      expect(action).toEqual({
        type: "FETCH_ALL_FILMS_SUCCESS",
        payload: { films: undefined },
      });
    });

    it("Failure", () => {
      const action = Action.fetchAllFilmsFailure();
      expect(action).toEqual({
        type: "FETCH_ALL_FILMS_ERROR",
      });
    });
  });
  describe("Thunk action", () => {
    describe("Fetching all films", () => {
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

      it("Success (empty case)", () => {
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

      it("Success (null case)", () => {
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

      it("error", () => {
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

      it("fetchAllFilms", () => {
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
