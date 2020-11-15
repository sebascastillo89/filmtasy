import currentCharacter from "./currentCharacter";

describe("Current character reducers", () => {
  it("fetch character (REQUEST)", () => {
    const newState = currentCharacter(
      {
        id: null,
        isFetching: false,
      },
      { type: "FETCH_CHARACTER_REQUEST", payload: { characterId: 1 } }
    );
    expect(newState.id).toEqual(1);
    expect(newState.isFetching).toEqual(true);
  });

  it("fetch character (SUCCESS)", () => {
    const newState = currentCharacter(
      {
        id: 1,
        isFetching: true,
      },
      { type: "FETCH_CHARACTER_SUCCESS" }
    );
    expect(newState.id).toEqual(1);
    expect(newState.isFetching).toEqual(false);
  });

  it("fetch character (ERROR)", () => {
    const newState = currentCharacter(
      {
        id: 1,
        isFetching: true,
      },
      { type: "FETCH_CHARACTER_FAILURE" }
    );
    expect(newState.id).toEqual(1);
    expect(newState.isFetching).toEqual(false);
  });

  it("fetch character (SKIP)", () => {
    const newState = currentCharacter(
      {
        id: 1,
        isFetching: true,
      },
      { type: "SKIP_FETCH_CHARACTER" }
    );
    expect(newState.id).toEqual(1);
    expect(newState.isFetching).toEqual(false);
  });

  it("default", () => {
    const newState = currentCharacter(
      {
        id: 1,
        isFetching: true,
      },
      { type: "default" }
    );
    expect(newState).toEqual({
      id: 1,
      isFetching: true,
    });
  });
});
