import * as Action from "./filmActions";
import moxios from "moxios";
import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";

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

describe("Single film actions", () => {
  describe("Fetching films", () => {
    it("Request", () => {
      const action = Action.fetchFilmRequest(1);
      expect(action).toEqual({
        type: "FETCH_FILM_REQUEST",
        payload: { filmId: 1 },
      });
    });

    it("Request (null case)", () => {
      const action = Action.fetchFilmRequest(null);
      expect(action).toEqual({
        type: "FETCH_FILM_REQUEST",
        payload: { filmId: null },
      });
    });

    it("Request (empty case)", () => {
      const action = Action.fetchFilmRequest();
      expect(action).toEqual({
        type: "FETCH_FILM_REQUEST",
        payload: { filmId: undefined },
      });
    });

    it("Success", () => {
      const action = Action.fetchFilmSuccess();
      expect(action).toEqual({
        type: "FETCH_FILM_SUCCESS",
      });
    });

    it("Failure", () => {
      const action = Action.fetchFilmFailure();
      expect(action).toEqual({
        type: "FETCH_FILM_ERROR",
      });
    });

    it("Skip", () => {
      const action = Action.skipFetchFilm(1);
      expect(action).toEqual({
        type: "FETCH_FILM_SKIP",
        payload: { filmId: 1 },
      });
    });

    it("Skip (null case)", () => {
      const action = Action.skipFetchFilm(null);
      expect(action).toEqual({
        type: "FETCH_FILM_SKIP",
        payload: { filmId: null },
      });
    });

    it("Skip (empty case)", () => {
      const action = Action.skipFetchFilm();
      expect(action).toEqual({
        type: "FETCH_FILM_SKIP",
        payload: { filmId: undefined },
      });
    });
  });
});

describe("Adding new film", () => {
  it("ok", () => {
    const action = Action.addFilm(1);
    expect(action).toEqual({
      type: "ADD_FILM",
      payload: { film: 1 },
    });
  });

  it("Null case", () => {
    const action = Action.addFilm(null);
    expect(action).toEqual({
      type: "ADD_FILM",
      payload: { film: null },
    });
  });

  it("Empty case", () => {
    const action = Action.addFilm();
    expect(action).toEqual({
      type: "ADD_FILM",
      payload: { film: undefined },
    });
  });
});

describe("Thunk action", () => {
  describe("Fetching single film", () => {
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

    it("Success (empty case)", () => {
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

    it("Failure (Error API)", () => {
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

    it("Failure (invalid film id case)", () => {
      jest.setTimeout(10000);
      const expectedActions = [
        {
          type: "FETCH_FILM_ERROR",
        },
      ];
      store.dispatch(Action.fetchFilm("invalid"));
      const actualAction = store.getActions();
      expect(actualAction).toEqual(expectedActions);
    });

    it("Failure (empty film id case)", () => {
      jest.setTimeout(10000);
      const expectedActions = [
        {
          type: "FETCH_FILM_ERROR",
        },
      ];
      store.dispatch(Action.fetchFilm());
      const actualAction = store.getActions();
      expect(actualAction).toEqual(expectedActions);
    });

    it("Failure (null film id case)", () => {
      jest.setTimeout(10000);
      const expectedActions = [
        {
          type: "FETCH_FILM_ERROR",
        },
      ];
      store.dispatch(Action.fetchFilm(null));
      const actualAction = store.getActions();
      expect(actualAction).toEqual(expectedActions);
    });

    it("Skip (cause is fetched)", () => {
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
