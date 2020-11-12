import reducer from "./index";

const initialState = {
  errors: [],
  films: {
    isFetching: false,
    favourites: [],
    items: null,
  },
  card: {
    selectedFilm: null,
    selectedCharacter: null,
    isLoading: false,
    characters: [],
  },
  characters: [],
};

describe("Reducers", () => {
  describe("Fetching films", () => {
    it("fetch_films_request_no_payload", () => {
      const newState = reducer(initialState, {
        type: "FETCH_FILMS_REQUEST",
      });
      expect(newState.films).toEqual({
        isFetching: true,
        favourites: [],
        items: null,
      });
    });

    it("fetch_films_success_palyoad", () => {
      const newState = reducer(initialState, {
        type: "FETCH_FILMS_SUCCESS",
        payload: { films: 1 },
      });
      expect(newState.films).toEqual({
        isFetching: false,
        favourites: [],
        items: 1,
      });
    });

    it("fetch_films_success_payload_obj", () => {
      const newState = reducer(initialState, {
        type: "FETCH_FILMS_SUCCESS",
        payload: { films: [] },
      });
      expect(newState.films).toEqual({
        isFetching: false,
        favourites: [],
        items: [],
      });
    });

    it("fetch_films_failure_no_payload", () => {
      const newState = reducer(initialState, {
        type: "FETCH_FILMS_FAILURE",
      });
      expect(newState.films).toEqual({
        isFetching: false,
        favourites: [],
        items: null,
      });
      expect(newState.errors).toEqual([]);
    });

    it("fetch_films_failure_invalid_payload", () => {
      const newState = reducer(initialState, {
        type: "FETCH_FILMS_FAILURE",
        payload: { unknownparam: "error" },
      });
      expect(newState.films).toEqual({
        isFetching: false,
        favourites: [],
        items: null,
      });
      expect(newState.errors).toEqual([]);
    });

    it("fetch_films_failure_payload", () => {
      const newState = reducer(initialState, {
        type: "FETCH_FILMS_FAILURE",
        payload: { errorMessage: "error" },
      });
      expect(newState.films).toEqual({
        isFetching: false,
        favourites: [],
        items: null,
      });
      expect(newState.errors).toEqual(["error"]);
    });
  });
});
