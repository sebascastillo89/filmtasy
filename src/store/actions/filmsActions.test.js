import * as Action from "./filmsActions";
import axios from "axios";

jest.setTimeout(10000);
jest.mock("axios");

describe("Films actions", () => {
  describe("Requesting films", () => {
    it("When request films, then not include a payload", () => {
      const action = Action.fetchAllFilmsRequest();
      expect(action).toEqual({
        type: "FETCH_ALL_FILMS_REQUEST",
      });
    });
  });

  describe("Skipping films requests", () => {
    it("When skip films request, then not include a payload", () => {
      const action = Action.fetchAllFilmsSkip();
      expect(action).toEqual({
        type: "FETCH_ALL_FILMS_SKIP",
      });
    });
  });

  describe("Fetching films successfully", () => {
    it("When fetch film successfully, then payload include films", () => {
      const action = Action.fetchAllFilmsSuccess(1);
      expect(action).toEqual({
        type: "FETCH_ALL_FILMS_SUCCESS",
        payload: { films: 1 },
      });
    });

    it("When fetch films successfully (null case), then payload include films", () => {
      const action = Action.fetchAllFilmsSuccess(null);
      expect(action).toEqual({
        type: "FETCH_ALL_FILMS_SUCCESS",
        payload: { films: null },
      });
    });

    it("When fetch films successfully (empty case), then payload include films", () => {
      const action = Action.fetchAllFilmsSuccess();
      expect(action).toEqual({
        type: "FETCH_ALL_FILMS_SUCCESS",
        payload: { films: undefined },
      });
    });
  });

  describe("Fetching films with errors", () => {
    it("When fetch films with errors, then payload is empty", () => {
      const action = Action.fetchAllFilmsFailure();
      expect(action).toEqual({
        type: "FETCH_ALL_FILMS_ERROR",
      });
    });
  });

  describe("Thunk action", () => {
    describe("fetchAllFilms", () => {
      it("When films are already cached, then dispatch anything", () => {
        const dispatch = jest.fn();
        const getState = jest.fn().mockReturnValue({
          films: { isCached: true },
          currentFilm: {},
        });
        Action.fetchAllFilms()(dispatch, getState);
        expect(dispatch.mock.calls[0][0]).toEqual({
          type: "FETCH_ALL_FILMS_REQUEST",
        });
        expect(dispatch.mock.calls[1][0]).toEqual({
          type: "FETCH_ALL_FILMS_SKIP",
        });
      });

      it("When API return 200OK, then dispatch data", () => {
        axios.get.mockImplementationOnce(() =>
          Promise.resolve({
            status: 200,
            data: { results: [{ title: "MyTitle" }] },
          })
        );

        const dispatch = jest.fn();
        const getState = jest.fn().mockReturnValue({
          films: [{ isCached: false }],
          currentFilm: {},
        });

        return Action.fetchAllFilms()(dispatch, getState)
          .then(function () {
            expect(dispatch.mock.calls[0][0]).toEqual({
              type: "FETCH_ALL_FILMS_REQUEST",
            });
            expect(dispatch.mock.calls[1][0]).toEqual({
              type: "FETCH_ALL_FILMS_SUCCESS",
              payload: { films: [{ title: "MyTitle" }] },
            });
          })
          .catch(function (err) {
            expect(true).toEqual(false);
          });
      });

      it("When API return 500Err, then dispatch error", () => {
        axios.get.mockImplementationOnce(() =>
          Promise.reject({
            status: 500,
          })
        );

        const dispatch = jest.fn();
        const getState = jest.fn().mockReturnValue({
          films: [{ isCached: false }],
          currentFilm: { id: 14 },
        });
        return Action.fetchAllFilms()(dispatch, getState)
          .then(function () {
            expect(dispatch.mock.calls[0][0]).toEqual({
              type: "FETCH_ALL_FILMS_REQUEST",
            });
            expect(dispatch.mock.calls[1][0]).toEqual({
              type: "FETCH_ALL_FILMS_ERROR",
            });
            expect(dispatch.mock.calls[2][0]).toEqual({
              type: "ADD_ERROR",
              payload: { error: "errorFetchingFilms" },
            });
          })
          .catch(function (err) {
            expect(true).toEqual(false);
          });
      });
    });
  });
});
