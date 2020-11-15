import * as Action from "./filmActions";

describe("Single film actions", () => {
  describe("Fetching film (REQUEST)", () => {
    it("fetchFilmRequest", () => {
      const action = Action.fetchFilmRequest(1);
      expect(action).toEqual({
        type: "FETCH_FILM_REQUEST",
        payload: { filmId: 1 },
      });
    });

    it("fetchFilmRequestNull", () => {
      const action = Action.fetchFilmRequest(null);
      expect(action).toEqual({
        type: "FETCH_FILM_REQUEST",
        payload: { filmId: null },
      });
    });

    it("fetchFilmRequestUndefined", () => {
      const action = Action.fetchFilmRequest();
      expect(action).toEqual({
        type: "FETCH_FILM_REQUEST",
        payload: { filmId: undefined },
      });
    });
  });

  describe("Fetching film (SUCCESS)", () => {
    it("fetchFilmSuccess", () => {
      const action = Action.fetchFilmSuccess();
      expect(action).toEqual({
        type: "FETCH_FILM_OK",
      });
    });
  });

  describe("Fetching film (FAILURE)", () => {
    it("fetchFilmFailure", () => {
      const action = Action.fetchFilmFailure();
      expect(action).toEqual({
        type: "FETCH_FILM_ERROR",
      });
    });
  });

  describe("Fetching film (SKIP)", () => {
    it("skipFetchFilm", () => {
      const action = Action.skipFetchFilm(1);
      expect(action).toEqual({
        type: "FETCH_FILM_SKIP",
        payload: { filmId: 1 },
      });
    });

    it("skipFetchFilmNull", () => {
      const action = Action.skipFetchFilm(null);
      expect(action).toEqual({
        type: "FETCH_FILM_SKIP",
        payload: { filmId: null },
      });
    });

    it("skipFetchFilmUndefined", () => {
      const action = Action.skipFetchFilm();
      expect(action).toEqual({
        type: "FETCH_FILM_SKIP",
        payload: { filmId: undefined },
      });
    });
  });

  describe("Adding film", () => {
    it("addFilm", () => {
      const action = Action.addFilm(1);
      expect(action).toEqual({
        type: "ADD_FILM",
        payload: { film: 1 },
      });
    });

    it("addFilmNull", () => {
      const action = Action.addFilm(null);
      expect(action).toEqual({
        type: "ADD_FILM",
        payload: { film: null },
      });
    });

    it("addFilmUndefined", () => {
      const action = Action.addFilm();
      expect(action).toEqual({
        type: "ADD_FILM",
        payload: { film: undefined },
      });
    });
  });
});
