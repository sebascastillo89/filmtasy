import characters from "./characters";

describe("Characters reducers", () => {
  it("fetch character (REQUEST)", () => {
    const newState = characters([], {
      type: "FETCH_FILM_CHARACTER_REQUEST",
      payload: { characterId: 1 },
    });
    expect(newState.length).toEqual(1);
    expect(newState).toEqual([{ id: 1, isFetching: true }]);
  });

  it("fetch character (SUCCESS AND EMPTY)", () => {
    const newState = characters([], {
      type: "FETCH_FILM_CHARACTER_SUCCESS",
      payload: { characterId: 1 },
    });
    expect(newState.length).toEqual(0);
    expect(newState).toEqual([]);
  });

  it("fetch character (SUCCESS)", () => {
    const newState = characters([{ id: 1, isFetching: true }], {
      type: "FETCH_FILM_CHARACTER_SUCCESS",
      payload: { characterId: 1, character: { name: "char2" } },
    });
    expect(newState.length).toEqual(1);
    expect(newState).toEqual([
      {
        id: 1,
        isFetching: false,
        item: {
          name: "char2",
          id: 1,
        },
      },
    ]);
  });

  it("fetch character (ERROR AND EMPTY)", () => {
    const newState = characters([], {
      type: "FETCH_FILM_CHARACTER_FAILURE",
      payload: { characterId: 1 },
    });
    expect(newState).toEqual([]);
  });

  it("fetch character (ERROR)", () => {
    const newState = characters([{ id: 1, isFetching: true }], {
      type: "FETCH_FILM_CHARACTER_FAILURE",
      payload: { characterId: 1 },
    });
    expect(newState).toEqual([{ id: 1, isFetching: false, item: null }]);
  });

  it("add character", () => {
    const newState = characters([{ id: 1, isFetching: true }], {
      type: "ADD_CHARACTER",
      payload: { characterId: 1, character: { name: "charName" } },
    });
    expect(newState).toEqual([
      { id: 1, isFetching: true },
      {
        id: 1,
        isFetching: false,
        item: {
          name: "charName",
          id: 1,
        },
      },
    ]);
  });

  it("default", () => {
    const newState = characters([{ id: 1, isFetching: true }], {
      type: "default",
    });
    expect(newState).toEqual([{ id: 1, isFetching: true }]);
  });
});
