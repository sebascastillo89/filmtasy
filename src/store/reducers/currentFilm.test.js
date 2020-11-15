import currentFilm from "./currentFilm";

describe("Current film reducers", () => {
  it("fetch film (REQUEST)", () => {
    const newState = currentFilm(
      {
        id: null,
        isFetchingFilm: false,
        isFetchingCharacters: false,
      },
      { type: "FETCH_FILM_REQUEST", payload: { filmId: 1 } }
    );
    expect(newState.id).toEqual(1);
    expect(newState.isFetchingFilm).toEqual(true);
    expect(newState.isFetchingCharacters).toEqual(true);
  });

  it("fetch film (SUCCESS)", () => {
    const newState = currentFilm(
      {
        id: 1,
        isFetchingFilm: true,
        isFetchingCharacters: true,
      },
      { type: "FETCH_FILM_OK" }
    );
    expect(newState.id).toEqual(1);
    expect(newState.isFetchingFilm).toEqual(false);
    expect(newState.isFetchingCharacters).toEqual(true);
  });

  it("fetch film (ERROR)", () => {
    const newState = currentFilm(
      {
        id: 1,
        isFetchingFilm: true,
        isFetchingCharacters: true,
      },
      { type: "FETCH_FILM_ERROR" }
    );
    expect(newState.id).toEqual(1);
    expect(newState.isFetchingFilm).toEqual(false);
    expect(newState.isFetchingCharacters).toEqual(false);
  });

  it("fetch film (SKIP)", () => {
    const newState = currentFilm(
      {
        id: 1,
        isFetchingFilm: true,
        isFetchingCharacters: true,
      },
      { type: "FETCH_FILM_SKIP" }
    );
    expect(newState.id).toEqual(1);
    expect(newState.isFetchingFilm).toEqual(false);
    expect(newState.isFetchingCharacters).toEqual(true);
  });

  it("fetch film characters", () => {
    const newState = currentFilm(
      {
        id: 1,
        isFetchingFilm: true,
        isFetchingCharacters: true,
      },
      { type: "FETCH_FILM_CHARACTERS_SUCCESS" }
    );
    expect(newState.id).toEqual(1);
    expect(newState.isFetchingFilm).toEqual(true);
    expect(newState.isFetchingCharacters).toEqual(false);
  });

  it("default", () => {
    const newState = currentFilm(
      {
        id: 1,
        isFetchingFilm: true,
        isFetchingCharacters: true,
      },
      { type: "default" }
    );
    expect(newState).toEqual({
      id: 1,
      isFetchingFilm: true,
      isFetchingCharacters: true,
    });
  });
});