import currentCharacter from "./currentCharacter";

describe("Current character reducers", () => {
  describe("REQUEST", () => {
    it("Whem fetch request, then update currentCharacter state", () => {
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

  describe("SUCCESS", () => {
    it("When fecth successfully, then update currentCharacter state", () => {
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

  describe("FAILURE", () => {
    it("When fecth with errors, then update currentCharacter state", () => {
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

  describe("SKIP", () => {
    it("When fecth is skipped, then update currentCharacter state", () => {
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

describe("DEFAULT", () => {
  it("When default action dispatched, then update currentCharacter state", () => {
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
