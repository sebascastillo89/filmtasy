import {
  fetchFilmsRequest,
  fetchFilmsSuccess,
  fetchFilmsFailure,
  selectFilmRequest,
  fetchCharacterRequest,
  fetchCharacterSuccess,
  fetchCharacterFailure,
  skipFetchCharacter,
  resetError,
  saveFilmAsFavourite,
  removeFilmFromFavourite,
  saveCharacterAsFavourite,
  removeCharacterFromFavourite,
  selectCharacter,
  unselectCharacter,
  fetchFilms,
} from "./index";

describe("Actions", () => {
  describe("Fetching films", () => {
    it("fetch_films_request", () => {
      const action = fetchFilmsRequest();
      expect(action).toEqual({
        type: "FETCH_FILMS_REQUEST",
      });
    });

    it("fetch_films_request with params", () => {
      const action = fetchFilmsRequest(1);
      expect(action).toEqual({
        type: "FETCH_FILMS_REQUEST",
      });
    });

    it("fetch_films_success", () => {
      const action = fetchFilmsSuccess();
      expect(action).toEqual({
        type: "FETCH_FILMS_SUCCESS",
        payload: { films: undefined },
      });
    });

    it("fetch_films_success with params", () => {
      const action = fetchFilmsSuccess(1);
      expect(action).toEqual({
        type: "FETCH_FILMS_SUCCESS",
        payload: { films: 1 },
      });
    });

    it("fetch_films_failure", () => {
      const action = fetchFilmsFailure();
      expect(action).toEqual({
        type: "FETCH_FILMS_FAILURE",
        payload: { errorMessage: undefined },
      });
    });

    it("fetch_films_failure with params", () => {
      const action = fetchFilmsFailure(1);
      expect(action).toEqual({
        type: "FETCH_FILMS_FAILURE",
        payload: { errorMessage: 1 },
      });
    });
  });

  describe("Selecting film", () => {
    it("select_film_request", () => {
      const action = selectFilmRequest(2);
      expect(action).toEqual({
        type: "SELECT_FILM_REQUEST",
        payload: 2,
      });
    });
  });

  describe("Fetching characters", () => {
    it("fetch_character_request", () => {
      const action = fetchCharacterRequest(2);
      expect(action).toEqual({
        type: "FETCH_CHARACTER_REQUEST",
        payload: 2,
      });
    });

    it("fetch_character_success", () => {
      const action = fetchCharacterSuccess(2, { test: "ok" });
      expect(action).toEqual({
        type: "FETCH_CHARACTER_SUCCESS",
        payload: { characterId: 2, character: { test: "ok" } },
      });
    });

    it("fetch_character_failure", () => {
      const action = fetchCharacterFailure("error");
      expect(action).toEqual({
        type: "FETCH_CHARACTER_FAILURE",
        payload: { errorMessage: "error" },
      });
    });

    it("skip_fetch_character", () => {
      const action = skipFetchCharacter(3);
      expect(action).toEqual({
        type: "SKIP_FETCH_CHARACTER",
        payload: 3,
      });
    });
  });

  describe("Errors managment", () => {
    it("reset_error", () => {
      const action = resetError(4);
      expect(action).toEqual({
        type: "RESET_ERROR",
        payload: { errorIndex: 4 },
      });
    });
  });

  describe("Favourites managment", () => {
    it("save_favourite_film", () => {
      const action = saveFilmAsFavourite(5);
      expect(action).toEqual({
        type: "SAVE_FAVOURITE_FILM",
        payload: { index: 5 },
      });
    });

    it("remove_favourite_film", () => {
      const action = removeFilmFromFavourite(6);
      expect(action).toEqual({
        type: "REMOVE_FAVOURITE_FILM",
        payload: { index: 6 },
      });
    });

    it("save_favourite_character", () => {
      const action = saveCharacterAsFavourite(7);
      expect(action).toEqual({
        type: "SAVE_FAVOURITE_CHARACTER",
        payload: { index: 7 },
      });
    });

    it("remove_favourite_character", () => {
      const action = removeCharacterFromFavourite(8);
      expect(action).toEqual({
        type: "REMOVE_FAVOURITE_CHARACTER",
        payload: { index: 8 },
      });
    });
  });
  describe("Selecting character", () => {
    it("select_character", () => {
      const action = selectCharacter(9);
      expect(action).toEqual({
        type: "SELECT_CHARACTER",
        payload: { index: 9 },
      });
    });

    it("unselect_character", () => {
      const action = unselectCharacter();
      expect(action).toEqual({
        type: "UNSELECT_CHARACTER",
      });
    });

    it("unselect_character with parameters", () => {
      const action = unselectCharacter(10);
      expect(action).toEqual({
        type: "UNSELECT_CHARACTER",
      });
    });
  });

  describe("Thunk action for fetching films", () => {
    it("thunk_fetch_films", () => {
      //TODO como testeo esto?
    });
  });
});
