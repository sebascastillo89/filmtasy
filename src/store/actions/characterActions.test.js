import * as Action from "./characterActions";

describe("Characters actions", () => {
  describe("Fetching film characters (REQUEST)", () => {
    it("fetchFilmCharacterRequestRequest", () => {
      const action = Action.fetchFilmCharacterRequest(1);
      expect(action).toEqual({
        type: "FETCH_FILM_CHARACTER_REQUEST",
        payload: { characterId: 1 },
      });
    });

    it("fetchFilmCharacterRequest_nullRequest", () => {
      const action = Action.fetchFilmCharacterRequest(null);
      expect(action).toEqual({
        type: "FETCH_FILM_CHARACTER_REQUEST",
        payload: { characterId: null },
      });
    });

    it("fetchFilmCharacterRequest_emptyRequest", () => {
      const action = Action.fetchFilmCharacterRequest();
      expect(action).toEqual({
        type: "FETCH_FILM_CHARACTER_REQUEST",
        payload: { characterId: undefined },
      });
    });

    it("fetchFilmCharacterRequest_invalidRequest", () => {
      const action = Action.fetchFilmCharacterRequest("invalid");
      expect(action).toEqual({
        type: "FETCH_FILM_CHARACTER_REQUEST",
        payload: { characterId: "invalid" },
      });
    });

    it("fetchFilmCharactersSuccess", () => {
      const action = Action.fetchFilmCharactersSuccess("filmId");
      expect(action).toEqual({
        type: "FETCH_FILM_CHARACTERS_SUCCESS",
        payload: { filmId: "filmId" },
      });
    });
  });

  describe("Fetching film characters (SUCCESS)", () => {
    it("fetchFilmCharacterSuccess", () => {
      const action = Action.fetchFilmCharacterSuccess(1, 2);
      expect(action).toEqual({
        type: "FETCH_FILM_CHARACTER_SUCCESS",
        payload: { characterId: 1, character: 2 },
      });
    });

    it("fetchFilmCharacterSuccessNulls", () => {
      const action = Action.fetchFilmCharacterSuccess(null, null);
      expect(action).toEqual({
        type: "FETCH_FILM_CHARACTER_SUCCESS",
        payload: { characterId: null, character: null },
      });
    });

    it("fetchFilmCharacterSuccessEmpty", () => {
      const action = Action.fetchFilmCharacterSuccess();
      expect(action).toEqual({
        type: "FETCH_FILM_CHARACTER_SUCCESS",
        payload: { characterId: undefined, character: undefined },
      });
    });

    it("fetchFilmCharacterSuccessOneNull", () => {
      const action = Action.fetchFilmCharacterSuccess(null);
      expect(action).toEqual({
        type: "FETCH_FILM_CHARACTER_SUCCESS",
        payload: { characterId: null, character: undefined },
      });
    });

    it("fetchFilmCharacterSuccessOneArgs", () => {
      const action = Action.fetchFilmCharacterSuccess(3);
      expect(action).toEqual({
        type: "FETCH_FILM_CHARACTER_SUCCESS",
        payload: { characterId: 3, character: undefined },
      });
    });
  });

  describe("Fetching film characters (FAILURE)", () => {
    it("fetchFilmCharacterFailure_emptyError", () => {
      const action = Action.fetchFilmCharacterFailure();
      expect(action).toEqual({
        type: "FETCH_FILM_CHARACTER_FAILURE",
        payload: { errorMessage: undefined },
      });
    });

    it("fetchFilmCharacterFailure_nullError", () => {
      const action = Action.fetchFilmCharacterFailure(null);
      expect(action).toEqual({
        type: "FETCH_FILM_CHARACTER_FAILURE",
        payload: { errorMessage: null },
      });
    });

    it("fetchFilmCharacterFailure", () => {
      const action = Action.fetchFilmCharacterFailure("a");
      expect(action).toEqual({
        type: "FETCH_FILM_CHARACTER_FAILURE",
        payload: { errorMessage: "a" },
      });
    });
  });

  describe("Fetching character (REQUEST)", () => {
    it("fetchCharacterRequest_empty", () => {
      const action = Action.fetchCharacterRequest();
      expect(action).toEqual({
        type: "FETCH_CHARACTER_REQUEST",
        payload: { characterId: undefined },
      });
    });

    it("fetchCharacterRequest_null", () => {
      const action = Action.fetchCharacterRequest(null);
      expect(action).toEqual({
        type: "FETCH_CHARACTER_REQUEST",
        payload: { characterId: null },
      });
    });

    it("fetchCharacterRequest", () => {
      const action = Action.fetchCharacterRequest(1);
      expect(action).toEqual({
        type: "FETCH_CHARACTER_REQUEST",
        payload: { characterId: 1 },
      });
    });
  });

  describe("Fetching character (SUCCESS)", () => {
    it("fetchCharacterSuccess_empty", () => {
      const action = Action.fetchCharacterSuccess();
      expect(action).toEqual({
        type: "FETCH_CHARACTER_SUCCESS",
        payload: { characterId: undefined },
      });
    });

    it("fetchCharacterSuccess_null", () => {
      const action = Action.fetchCharacterSuccess(null);
      expect(action).toEqual({
        type: "FETCH_CHARACTER_SUCCESS",
        payload: { characterId: null },
      });
    });

    it("fetchCharacterSuccess", () => {
      const action = Action.fetchCharacterSuccess(2);
      expect(action).toEqual({
        type: "FETCH_CHARACTER_SUCCESS",
        payload: { characterId: 2 },
      });
    });
  });

  describe("Fetching character (FAILURE)", () => {
    it("fetchCharacterFailure_empty", () => {
      const action = Action.fetchCharacterFailure();
      expect(action).toEqual({
        type: "FETCH_CHARACTER_FAILURE",
        payload: { errorMessage: undefined },
      });
    });

    it("fetchCharacterFailure_null", () => {
      const action = Action.fetchCharacterFailure(null);
      expect(action).toEqual({
        type: "FETCH_CHARACTER_FAILURE",
        payload: { errorMessage: null },
      });
    });

    it("fetchCharacterFailure", () => {
      const action = Action.fetchCharacterFailure("error1");
      expect(action).toEqual({
        type: "FETCH_CHARACTER_FAILURE",
        payload: { errorMessage: "error1" },
      });
    });
  });

  describe("Fetching character (SKIP)", () => {
    it("skipFetchCharacter", () => {
      const action = Action.skipFetchCharacter();
      expect(action).toEqual({
        type: "SKIP_FETCH_CHARACTER",
      });
    });
  });

  describe("Adding character", () => {
    it("addCharacter", () => {
      const action = Action.addCharacter(1, "filmId");
      expect(action).toEqual({
        type: "ADD_CHARACTER",
        payload: { characterId: 1, character: "filmId" },
      });
    });
  });
});
