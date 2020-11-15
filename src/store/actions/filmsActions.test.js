import * as Action from "./filmsActions";

describe("Films actions", () => {
  it("Fetch all films (REQUEST)", () => {
    const action = Action.fetchAllFilmsRequest();
    expect(action).toEqual({
      type: "FETCH_ALL_FILMS_REQUEST",
    });
  });

  it("Fetch all films (SKIP)", () => {
    const action = Action.fetchAllFilmsSkip();
    expect(action).toEqual({
      type: "FETCH_ALL_FILMS_SKIP",
    });
  });

  it("Fetch all films (SUCCESS)", () => {
    const action = Action.fetchAllFilmsSuccess(1);
    expect(action).toEqual({
      type: "FETCH_ALL_FILMS_OK",
      payload: { films: 1 },
    });
  });

  it("Fetch all films (SUCCESS NULL)", () => {
    const action = Action.fetchAllFilmsSuccess(null);
    expect(action).toEqual({
      type: "FETCH_ALL_FILMS_OK",
      payload: { films: null },
    });
  });

  it("Fetch all films (REQUEST EMPTY)", () => {
    const action = Action.fetchAllFilmsSuccess();
    expect(action).toEqual({
      type: "FETCH_ALL_FILMS_OK",
      payload: { films: undefined },
    });
  });

  it("fetchAllFilmsFailure", () => {
    const action = Action.fetchAllFilmsFailure();
    expect(action).toEqual({
      type: "FETCH_ALL_FILMS_ERROR",
    });
  });
});
