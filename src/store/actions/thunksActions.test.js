import * as FilmsActions from "./filmsActions";
import * as FilmActions from "./filmActions";
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
const cachedState = {
  films: {
    isFetching: false,
    isCached: true,
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

describe("Thunk actions to fetch films", () => {
  describe("Fetching all films", () => {
    let store;
    beforeEach(() => {
      moxios.install();
      store = mockStore(initialState);
    });
    afterEach(() => {
      moxios.uninstall();
    });

    it("fetchAllFilms_success", () => {
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
          type: "FETCH_ALL_FILMS_OK",
          payload: { films: [mockFilm] },
        },
      ];
      return store.dispatch(FilmsActions.fetchAllFilms()).then(() => {
        const actualAction = store.getActions();
        expect(actualAction).toEqual(expectedActions);
      });
    });

    it("fetchAllFilms_emptyResponse", () => {
      jest.setTimeout(10000);
      moxios.wait(function () {
        let request = moxios.requests.mostRecent();
        request.respondWith({
          status: 200,
          response: { count: 2 },
        });
      });

      const expectedActions = [
        {
          type: "FETCH_ALL_FILMS_REQUEST",
        },
        {
          type: "FETCH_ALL_FILMS_OK",
          payload: { films: undefined },
        },
      ];
      return store.dispatch(FilmsActions.fetchAllFilms()).then(() => {
        const actualAction = store.getActions();
        expect(actualAction).toEqual(expectedActions);
      });
    });

    it("fetchAllFilms_error", () => {
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
      ];
      return store.dispatch(FilmsActions.fetchAllFilms()).then(() => {
        const actualAction = store.getActions();
        expect(actualAction).toEqual(expectedActions);
      });
    });
  });

  describe("Fetching a single film", () => {
    let store;
    beforeEach(() => {
      moxios.install();
      store = mockStore(initialState);
    });
    afterEach(() => {
      moxios.uninstall();
    });

    it("fetchFilm_success", () => {
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
          type: "FETCH_FILM_OK",
        },
        {
          type: "ADD_FILM",
          payload: { film: mockFilm },
        },
      ];
      return store.dispatch(FilmActions.fetchFilm(4)).then(() => {
        const actualAction = store.getActions();
        expect(actualAction).toEqual(expectedActions);
      });
    });

    it("fetchFilm_invalidFilmId", () => {
      jest.setTimeout(10000);
      const expectedActions = [
        {
          type: "FETCH_FILM_ERROR",
        },
      ];
      store.dispatch(FilmActions.fetchFilm("invalid"));
      const actualAction = store.getActions();
      expect(actualAction).toEqual(expectedActions);
    });

    it("fetchFilm_emptyRequest", () => {
      jest.setTimeout(10000);
      const expectedActions = [
        {
          type: "FETCH_FILM_ERROR",
        },
      ];
      store.dispatch(FilmActions.fetchFilm());
      const actualAction = store.getActions();
      expect(actualAction).toEqual(expectedActions);
    });

    it("fetchFilm_nullRequest", () => {
      jest.setTimeout(10000);
      const expectedActions = [
        {
          type: "FETCH_FILM_ERROR",
        },
      ];
      store.dispatch(FilmActions.fetchFilm(null));
      const actualAction = store.getActions();
      expect(actualAction).toEqual(expectedActions);
    });

    it("fetchFilm_emptyResponse", () => {
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
          type: "FETCH_FILM_OK",
        },
        {
          type: "ADD_FILM",
          payload: { film: null },
        },
      ];
      return store.dispatch(FilmActions.fetchFilm(4)).then(() => {
        const actualAction = store.getActions();
        expect(actualAction).toEqual(expectedActions);
      });
    });

    it("fetchFilm_error", () => {
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
          type: "FETCH_FILM_ERROR",
        },
      ];
      return store.dispatch(FilmActions.fetchFilm(4)).then(() => {
        const actualAction = store.getActions();
        expect(actualAction).toEqual(expectedActions);
      });
    });
  });

  describe("Fetching cached films", () => {
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
      store.dispatch(FilmsActions.fetchAllFilms());
      const actualAction = store.getActions();
      expect(actualAction).toEqual(expectedActions);
    });

    it("fetchFilm", () => {
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
      store.dispatch(FilmActions.fetchFilm(4));
      const actualAction = store.getActions();
      expect(actualAction).toEqual(expectedActions);
    });
  });
});
