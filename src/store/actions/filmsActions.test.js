import * as Action from "./filmsActions";
import moxios from "moxios";

jest.setTimeout(10000);

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
      beforeEach(() => {
        moxios.install();
      });
      afterEach(() => {
        moxios.uninstall();
      });

      it("When films are already cached, then dispatch anything", async () => {
        const dispatch = jest.fn();
        const getState = jest.fn().mockReturnValue({
          films: { isCached: true },
        });
        await Action.fetchAllFilms()(dispatch, getState);
        expect(dispatch.mock.calls[0][0]).toEqual({
          type: "FETCH_ALL_FILMS_REQUEST",
        });
        expect(dispatch.mock.calls[1][0]).toEqual({
          type: "FETCH_ALL_FILMS_SKIP",
        });
      });

      it("When API return 200OK, then dispatch data", async () => {
        moxios.wait(function () {
          let request = moxios.requests.mostRecent();
          request.respondWith({
            status: 200,
            response: { results: [{ title: "MyTitle" }] },
          });
        });
        const dispatch = jest.fn();
        const getState = jest.fn().mockReturnValue({
          films: [{ isCached: false }],
        });
        await Action.fetchAllFilms()(dispatch, getState);
        expect(dispatch.mock.calls[0][0]).toEqual({
          type: "FETCH_ALL_FILMS_REQUEST",
        });
        expect(dispatch.mock.calls[1][0]).toEqual({
          type: "FETCH_ALL_FILMS_SUCCESS",
          payload: { films: [{ title: "MyTitle" }] },
        });
      });

      it("When API return 500Err, then dispatch error", async () => {
        moxios.wait(function () {
          let request = moxios.requests.mostRecent();
          request.reject({
            status: 500,
            response: { name: "MyName" },
          });
        });
        const dispatch = jest.fn();
        const getState = jest.fn().mockReturnValue({
          films: [{ isCached: false }],
          currentFilm: { id: 14 },
        });
        await Action.fetchAllFilms()(dispatch, getState);
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
      });
    });
  });
});
