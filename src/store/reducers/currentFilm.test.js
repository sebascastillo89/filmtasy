import currentFilm from "./currentFilm";

describe("Current film reducers", () => {
  describe("Request", () => {
    it("fetch film (REQUEST)", () => {
      const newState = currentFilm(
        {
          id: null,
          isFetchingFilm: false,
          isFetchingCharacters: false,
          isFailure: true,
        },
        { type: "FETCH_FILM_REQUEST", payload: { filmId: 1 } }
      );
      expect(newState.id).toEqual(1);
      expect(newState.isFetchingFilm).toEqual(true);
      expect(newState.isFetchingCharacters).toEqual(true);
      expect(newState.isFailure).toEqual(false);
    });
  });

  describe("Success", () => {
    it("fetch film (SUCCESS)", () => {
      const newState = currentFilm(
        {
          id: 1,
          isFetchingFilm: true,
          isFetchingCharacters: true,
          isFailure: true,
        },
        { type: "FETCH_FILM_SUCCESS" }
      );
      expect(newState.id).toEqual(1);
      expect(newState.isFetchingFilm).toEqual(false);
      expect(newState.isFetchingCharacters).toEqual(true);
      expect(newState.isFailure).toEqual(false);
    });
  });
  describe("Error", () => {
    it("fetch film (ERROR)", () => {
      const newState = currentFilm(
        {
          id: 1,
          isFetchingFilm: true,
          isFetchingCharacters: true,
          isFailure: false,
        },
        { type: "FETCH_FILM_ERROR" }
      );
      expect(newState.id).toEqual(1);
      expect(newState.isFetchingFilm).toEqual(false);
      expect(newState.isFetchingCharacters).toEqual(false);
      expect(newState.isFailure).toEqual(true);
    });
  });
  describe("Skip", () => {
    it("fetch film (SKIP)", () => {
      const newState = currentFilm(
        {
          id: 1,
          isFetchingFilm: true,
          isFetchingCharacters: true,
          isFailure: false,
        },
        { type: "FETCH_FILM_SKIP" }
      );
      expect(newState.id).toEqual(1);
      expect(newState.isFetchingFilm).toEqual(false);
      expect(newState.isFailure).toEqual(false);
    });
  });

  describe("Fetching film characters", () => {
    it("fetch film characters", () => {
      const newState = currentFilm(
        {
          id: 1,
          isFetchingFilm: true,
          isFetchingCharacters: true,
          isFailure: false,
        },
        { type: "FETCH_FILM_CHARACTERS_SUCCESS" }
      );
      expect(newState.id).toEqual(1);
      expect(newState.isFetchingFilm).toEqual(true);
      expect(newState.isFetchingCharacters).toEqual(false);
      expect(newState.isFailure).toEqual(false);
    });
  });

  describe("Default", () => {
    it("default", () => {
      const newState = currentFilm(
        {
          id: 1,
          isFetchingFilm: true,
          isFetchingCharacters: true,
          isFailure: false,
        },
        { type: "default" }
      );
      expect(newState).toEqual({
        id: 1,
        isFetchingFilm: true,
        isFetchingCharacters: true,
        isFailure: false,
      });
    });
  });
});
