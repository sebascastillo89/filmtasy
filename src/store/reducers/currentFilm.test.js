import currentFilm from "./currentFilm";

describe("Current film reducers", () => {
  describe("REQUEST", () => {
    it("When fetch request, then update currentFilm state", () => {
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

  describe("SUCCESS", () => {
    it("When fetch successfully, then update currentFilm state", () => {
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
  describe("FAILURE", () => {
    it("When fetch with errors, then update currentFilm state", () => {
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

  describe("SKIP", () => {
    it("When fetch is skipped, then update currentFilm state", () => {
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
    it("When film characters fetched successfully, then update currentFilm state", () => {
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

  describe("DEFAULT", () => {
    it("When default state dispatched, the return the same state", () => {
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
