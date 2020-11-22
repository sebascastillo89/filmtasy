import * as Action from "./characterActions";
import axios from "axios";

jest.setTimeout(10000);
jest.mock("axios");

describe("Characters actions", () => {
  describe("Requesting a film character", () => {
    it("When id is specified, then the payload include the same characterId", () => {
      const action = Action.fetchFilmCharacterRequest(1);
      expect(action).toEqual({
        type: "FETCH_FILM_CHARACTER_REQUEST",
        payload: { characterId: 1 },
      });
    });

    it("When null id is specified, then the payload include null characterId", () => {
      const action = Action.fetchFilmCharacterRequest(null);
      expect(action).toEqual({
        type: "FETCH_FILM_CHARACTER_REQUEST",
        payload: { characterId: null },
      });
    });

    it("When empty id is specified, then the payload include undefined characterId", () => {
      const action = Action.fetchFilmCharacterRequest();
      expect(action).toEqual({
        type: "FETCH_FILM_CHARACTER_REQUEST",
        payload: { characterId: undefined },
      });
    });
  });

  describe("Fetching a film character successfully", () => {
    it("When id and data is specified, then the payload include the same values", () => {
      const action = Action.fetchFilmCharacterSuccess(1, { name: "Luke" });
      expect(action).toEqual({
        type: "FETCH_FILM_CHARACTER_SUCCESS",
        payload: { characterId: 1, character: { name: "Luke" } },
      });
    });

    it("When null id and data is specified, then the payload include null values", () => {
      const action = Action.fetchFilmCharacterSuccess(null, null);
      expect(action).toEqual({
        type: "FETCH_FILM_CHARACTER_SUCCESS",
        payload: { characterId: null, character: null },
      });
    });

    it("When no data is specified, then the payload include undefined values", () => {
      const action = Action.fetchFilmCharacterSuccess();
      expect(action).toEqual({
        type: "FETCH_FILM_CHARACTER_SUCCESS",
        payload: { characterId: undefined, character: undefined },
      });
    });

    it("When no data is specified, then the payload include undefined value", () => {
      const action = Action.fetchFilmCharacterSuccess(3);
      expect(action).toEqual({
        type: "FETCH_FILM_CHARACTER_SUCCESS",
        payload: { characterId: 3, character: undefined },
      });
    });
  });

  describe("Fetching a film character with errors", () => {
    it("When is called, then no payload was included", () => {
      const action = Action.fetchFilmCharacterFailure();
      expect(action).toEqual({
        type: "FETCH_FILM_CHARACTER_FAILURE",
      });
    });
  });

  describe("Requesting a single character", () => {
    it("When id is specified, then the payload include the same characterId", () => {
      const action = Action.fetchCharacterRequest(1);
      expect(action).toEqual({
        type: "FETCH_CHARACTER_REQUEST",
        payload: { characterId: 1 },
      });
    });

    it("When id is not specified, then the payload include undefined characterId", () => {
      const action = Action.fetchCharacterRequest();
      expect(action).toEqual({
        type: "FETCH_CHARACTER_REQUEST",
        payload: { characterId: undefined },
      });
    });

    it("When null id is specified, then the payload include null characterId", () => {
      const action = Action.fetchCharacterRequest(null);
      expect(action).toEqual({
        type: "FETCH_CHARACTER_REQUEST",
        payload: { characterId: null },
      });
    });
  });

  describe("Fetching a single character successfully", () => {
    it("When id is specified, then the payload include the same characterId", () => {
      const action = Action.fetchCharacterSuccess(2);
      expect(action).toEqual({
        type: "FETCH_CHARACTER_SUCCESS",
        payload: { characterId: 2 },
      });
    });

    it("When id is not specified, then the payload include undefined characterId", () => {
      const action = Action.fetchCharacterSuccess();
      expect(action).toEqual({
        type: "FETCH_CHARACTER_SUCCESS",
        payload: { characterId: undefined },
      });
    });

    it("When null id is specified, then the payload include null characterId", () => {
      const action = Action.fetchCharacterSuccess(null);
      expect(action).toEqual({
        type: "FETCH_CHARACTER_SUCCESS",
        payload: { characterId: null },
      });
    });
  });

  describe("Fetching a single character with errors", () => {
    it("When is called, then no payload was included", () => {
      const action = Action.fetchCharacterFailure();
      expect(action).toEqual({
        type: "FETCH_CHARACTER_FAILURE",
      });
    });
  });

  describe("Skipping a single character request", () => {
    it("When is skipped, then no payload was included", () => {
      const action = Action.skipFetchCharacter();
      expect(action).toEqual({
        type: "SKIP_FETCH_CHARACTER",
      });
    });
  });

  describe("Adding new character to characters list", () => {
    it("When is called, then payload include charId, success and char as payload", () => {
      const action = Action.addCharacter(1, true, "filmId");
      expect(action).toEqual({
        type: "ADD_CHARACTER",
        payload: { characterId: 1, success: true, character: "filmId" },
      });
    });
  });

  describe("Thunk characters", () => {
    describe("fetchCharacter", () => {
      it("When API return 200OK, then dispatch data", () => {
        axios.get.mockImplementationOnce(() =>
          Promise.resolve({
            status: 200,
            data: { name: "MyName" },
          })
        );

        const dispatch = jest.fn();
        const getState = jest.fn().mockReturnValue({
          characters: [{ id: 2 }],
          currentFilm: {},
        });
        return Action.fetchCharacter(1)(dispatch, getState)
          .then(function () {
            expect(dispatch.mock.calls[0][0]).toEqual({
              type: "FETCH_CHARACTER_REQUEST",
              payload: { characterId: 1 },
            });
            expect(dispatch.mock.calls[1][0]).toEqual({
              type: "FETCH_CHARACTER_SUCCESS",
              payload: { characterId: 1 },
            });
            expect(dispatch.mock.calls[2][0]).toEqual({
              type: "ADD_CHARACTER",
              payload: {
                characterId: 1,
                success: true,
                character: { name: "MyName" },
              },
            });
          })
          .catch(function (err) {
            expect(true).toEqual(false);
          });
      });

      it("When API return 500Error, then dispatch errors", () => {
        axios.get.mockImplementationOnce(() =>
          Promise.reject({
            status: 500,
          })
        );

        const dispatch = jest.fn();
        const getState = jest.fn().mockReturnValue({
          characters: [],
          currentFilm: {},
        });
        return Action.fetchCharacter(1)(dispatch, getState)
          .then(function () {
            expect(dispatch.mock.calls[0][0]).toEqual({
              type: "FETCH_CHARACTER_REQUEST",
              payload: { characterId: 1 },
            });
            expect(dispatch.mock.calls[1][0]).toEqual({
              type: "FETCH_CHARACTER_FAILURE",
            });
            expect(dispatch.mock.calls[2][0]).toEqual({
              type: "ADD_ERROR",
              payload: { error: "errorFetchingCharacter" },
            });
            expect(dispatch.mock.calls[3][0]).toEqual({
              type: "ADD_CHARACTER",
              payload: {
                characterId: 1,
                success: false,
                character: null,
              },
            });
          })
          .catch(function (err) {
            expect(true).toEqual(false);
          });
      });

      it("When character is cached, then skip fetch", () => {
        const dispatch = jest.fn();
        const getState = jest.fn().mockReturnValue({
          characters: [{ id: 2 }],
          currentFilm: {},
        });
        Action.fetchCharacter(2)(dispatch, getState);
        expect(dispatch.mock.calls[0][0]).toEqual({
          type: "FETCH_CHARACTER_REQUEST",
          payload: { characterId: 2 },
        });
        expect(dispatch.mock.calls[1][0]).toEqual({
          type: "SKIP_FETCH_CHARACTER",
        });
      });
    });

    describe("checkFilmCharacters", () => {
      it("When current film has no pending characters, then dispatch an action", () => {
        const dispatch = jest.fn();
        const getState = jest.fn().mockReturnValue({
          currentFilm: { id: 4, isFetchingCharacters: true },
          films: { items: [{ id: 4, characters: [2] }] },
          characters: [{ id: 2 }],
        });
        Action.checkFilmCharacters()(dispatch, getState);
        expect(dispatch.mock.calls[0][0]).toEqual({
          type: "FETCH_FILM_CHARACTERS_SUCCESS",
          payload: { filmId: 4 },
        });
      });

      it("When current film is not fetching characters, then dispatch anything", () => {
        const dispatch = jest.fn();
        const getState = jest.fn().mockReturnValue({
          currentFilm: { isFetchingCharacters: false },
        });
        Action.checkFilmCharacters()(dispatch, getState);
        expect(dispatch.mock.calls).toEqual([]);
      });

      it("When current film is fetching characters but there are an character fetching, then dispatch anything", () => {
        const dispatch = jest.fn();
        const getState = jest.fn().mockReturnValue({
          currentFilm: { id: 4, isFetchingCharacters: true },
          films: { items: [{ id: 4, characters: [2] }] },
          characters: [{ id: 2, isFetching: true }],
        });
        Action.checkFilmCharacters()(dispatch, getState);
        expect(dispatch.mock.calls).toEqual([]);
      });
    });
  });
});
