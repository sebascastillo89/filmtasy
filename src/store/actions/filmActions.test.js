import * as Action from "./filmActions";

import axios from "axios";

jest.setTimeout(10000);
jest.mock("axios");

describe("Single film actions", () => {
  describe("Requesting a film", () => {
    it("When id is specified, then the payload include the same filmId", () => {
      const action = Action.fetchFilmRequest(1);
      expect(action).toEqual({
        type: "FETCH_FILM_REQUEST",
        payload: { filmId: 1 },
      });
    });

    it("When null id is specified, then the payload include null filmId", () => {
      const action = Action.fetchFilmRequest(null);
      expect(action).toEqual({
        type: "FETCH_FILM_REQUEST",
        payload: { filmId: null },
      });
    });

    it("When empty id is specified, then the payload include undefined filmId", () => {
      const action = Action.fetchFilmRequest();
      expect(action).toEqual({
        type: "FETCH_FILM_REQUEST",
        payload: { filmId: undefined },
      });
    });
  });

  describe("Fetching film successfully", () => {
    it("When film is fetched successfully, then throw an action with no payload", () => {
      const action = Action.fetchFilmSuccess();
      expect(action).toEqual({
        type: "FETCH_FILM_SUCCESS",
      });
    });
  });

  describe("Fetching film with errors", () => {
    it("When film is fetched with errors, then throw an action with no payload", () => {
      const action = Action.fetchFilmFailure();
      expect(action).toEqual({
        type: "FETCH_FILM_ERROR",
      });
    });
  });

  describe("Skipping film request", () => {
    it("When film request is skipped, then throw an action with no payload", () => {
      const action = Action.skipFetchFilm(1);
      expect(action).toEqual({
        type: "FETCH_FILM_SKIP",
        payload: { filmId: 1 },
      });
    });
  });

  describe("Adding new film", () => {
    it("When id is specified, then payload include film", () => {
      const action = Action.addFilm(1);
      expect(action).toEqual({
        type: "ADD_FILM",
        payload: { film: 1 },
      });
    });

    it("When null id is specified, then payload include null film", () => {
      const action = Action.addFilm(null);
      expect(action).toEqual({
        type: "ADD_FILM",
        payload: { film: null },
      });
    });

    it("When empty id is specified, then payload include undefined film", () => {
      const action = Action.addFilm();
      expect(action).toEqual({
        type: "ADD_FILM",
        payload: { film: undefined },
      });
    });
  });

  describe("Thunk action", () => {
    describe("fetchFilm", () => {
      it("When films are already current film, then skip request", () => {
        const dispatch = jest.fn();
        const getState = jest.fn().mockReturnValue({
          currentFilm: { id: 1 },
          films: { isCached: false, items: [] },
        });
        Action.fetchFilm(1)(dispatch, getState);
        expect(dispatch.mock.calls[0][0]).toEqual({
          type: "FETCH_FILM_REQUEST",
          payload: { filmId: 1 },
        });
        expect(dispatch.mock.calls[1][0]).toEqual({
          type: "FETCH_FILM_SKIP",
          payload: { filmId: 1 },
        });
      });

      it("When films are cached, then skip request", () => {
        const dispatch = jest.fn();
        const getState = jest.fn().mockReturnValue({
          currentFilm: { id: 2 },
          films: { isCached: true, items: [] },
        });
        Action.fetchFilm(1)(dispatch, getState);
        expect(dispatch.mock.calls[0][0]).toEqual({
          type: "FETCH_FILM_REQUEST",
          payload: { filmId: 1 },
        });
        expect(dispatch.mock.calls[1][0]).toEqual({
          type: "FETCH_FILM_SKIP",
          payload: { filmId: 1 },
        });
      });

      it("When current film are cached, then skip request", () => {
        const dispatch = jest.fn();
        const getState = jest.fn().mockReturnValue({
          currentFilm: { id: 2 },
          films: { isCached: false, items: [{ id: 1 }] },
        });
        Action.fetchFilm(1)(dispatch, getState);
        expect(dispatch.mock.calls[0][0]).toEqual({
          type: "FETCH_FILM_REQUEST",
          payload: { filmId: 1 },
        });
        expect(dispatch.mock.calls[1][0]).toEqual({
          type: "FETCH_FILM_SKIP",
          payload: { filmId: 1 },
        });
      });

      it("When API returns 200OK, then add film", () => {
        axios.get.mockImplementationOnce(() =>
          Promise.resolve({
            status: 200,
            data: { title: "MyTitle" },
          })
        );

        const dispatch = jest.fn();
        const getState = jest.fn().mockReturnValue({
          currentFilm: { id: 2 },
          films: { isCached: false, items: [] },
        });
        return Action.fetchFilm(1)(dispatch, getState)
          .then(function () {
            expect(dispatch.mock.calls[0][0]).toEqual({
              type: "FETCH_FILM_REQUEST",
              payload: { filmId: 1 },
            });
            expect(dispatch.mock.calls[1][0]).toEqual({
              type: "FETCH_FILM_SUCCESS",
            });
            expect(dispatch.mock.calls[2][0]).toEqual({
              type: "ADD_FILM",
              payload: { film: { title: "MyTitle" } },
            });
          })
          .catch(function (err) {
            expect(true).toEqual(false);
          });
      });

      it("When API returns 500ERR, then add film", () => {
        axios.get.mockImplementationOnce(() =>
          Promise.reject({
            status: 500,
          })
        );

        const dispatch = jest.fn();
        const getState = jest.fn().mockReturnValue({
          currentFilm: { id: 2 },
          films: { isCached: false, items: [] },
        });
        return Action.fetchFilm(1)(dispatch, getState)
          .then(function () {
            expect(dispatch.mock.calls[0][0]).toEqual({
              type: "FETCH_FILM_REQUEST",
              payload: { filmId: 1 },
            });
            expect(dispatch.mock.calls[1][0]).toEqual({
              type: "ADD_ERROR",
              payload: { error: "errorFetchingFilm" },
            });
            expect(dispatch.mock.calls[2][0]).toEqual({
              type: "FETCH_FILM_ERROR",
            });
          })
          .catch(function (err) {
            expect(true).toEqual(false);
          });
      });
    });
  });
});
