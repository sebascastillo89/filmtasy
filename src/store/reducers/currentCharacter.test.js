import currentCharacter from "./currentCharacter";

describe("Current character reducers", () => {
  describe("Request", () => {
    it("fetch character (REQUEST)", () => {
      const newState = currentCharacter(
        {
          id: null,
          isFetching: false,
          isFailure: true,
        },
        { type: "FETCH_CHARACTER_REQUEST", payload: { characterId: 1 } }
      );
      expect(newState.id).toEqual(1);
      expect(newState.isFetching).toEqual(true);
      expect(newState.isFailure).toEqual(false);
    });
  });

  describe("Success", () => {
    it("fetch character (SUCCESS)", () => {
      const newState = currentCharacter(
        {
          id: 1,
          isFetching: true,
          isFailure: true,
        },
        { type: "FETCH_CHARACTER_SUCCESS" }
      );
      expect(newState.id).toEqual(1);
      expect(newState.isFetching).toEqual(false);
      expect(newState.isFailure).toEqual(false);
    });
  });

  describe("Error", () => {
    it("fetch character (ERROR)", () => {
      const newState = currentCharacter(
        {
          id: 1,
          isFetching: true,
          isFailure: false,
        },
        { type: "FETCH_CHARACTER_FAILURE" }
      );
      expect(newState.id).toEqual(1);
      expect(newState.isFetching).toEqual(false);
      expect(newState.isFailure).toEqual(true);
    });
  });

  describe("Skip", () => {
    it("fetch character (SKIP)", () => {
      const newState = currentCharacter(
        {
          id: 1,
          isFetching: true,
          isFailure: true,
        },
        { type: "SKIP_FETCH_CHARACTER" }
      );
      expect(newState.id).toEqual(1);
      expect(newState.isFetching).toEqual(false);
      expect(newState.isFailure).toEqual(false);
    });
  });
});

describe("Default case", () => {
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
