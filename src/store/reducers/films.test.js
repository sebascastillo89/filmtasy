import films from "./films";

describe("Films reducers", () => {
  it("fetch all films (REQUEST)", () => {
    const newState = films(
      {
        isFetching: false,
        isCached: false,
        items: [],
      },
      { type: "FETCH_ALL_FILMS_REQUEST" }
    );
    expect(newState.isFetching).toEqual(true);
  });

  it("fetch all films (SUCCESS)", () => {
    //TODO probar casos similares con url y characters incorrectos
    const newState = films(
      {
        isFetching: true,
        isCached: false,
        items: [],
      },
      {
        type: "FETCH_ALL_FILMS_OK",
        payload: {
          films: [
            {
              id: 1,
              url: "/films/1",
              characters: ["/people/2"],
            },
          ],
        },
      }
    );
    expect(newState.isFetching).toEqual(false);
    expect(newState.isCached).toEqual(true);
    expect(newState.items.length).toEqual(1);
  });

  it("fetch all films (ERROR)", () => {
    const newState = films(
      {
        isFetching: true,
        isCached: false,
        items: [{ id: 1 }],
      },
      { type: "FETCH_ALL_FILMS_ERROR" }
    );
    expect(newState.isFetching).toEqual(false);
    expect(newState.items.length).toEqual(0);
  });

  it("fetch all films (SKIP)", () => {
    const newState = films(
      {
        isFetching: true,
        isCached: false,
        items: [{ id: 1 }],
      },
      { type: "FETCH_ALL_FILMS_SKIP" }
    );
    expect(newState.isFetching).toEqual(false);
    expect(newState.items.length).toEqual(1);
  });

  it("Add film", () => {
    const newState = films(
      {
        isFetching: true,
        isCached: false,
        items: [{ id: 1 }],
      },
      {
        type: "ADD_FILM",
        payload: {
          film: {
            id: 1,
            url: "/films/1",
            characters: ["/people/2"],
          },
        },
      }
    );
    expect(newState.items.length).toEqual(2);
  });

  it("Default", () => {
    const newState = films(
      {
        isFetching: true,
        isCached: false,
        items: [{ id: 1 }],
      },
      {
        type: "DEFAULT",
      }
    );
    expect(newState).toEqual({
      isFetching: true,
      isCached: false,
      items: [{ id: 1 }],
    });
  });
});
