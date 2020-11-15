import errors from "./errors";

describe("Error reducers", () => {
  it("Adding error", () => {
    const newState = errors([], {
      type: "ADD_ERROR",
      payload: { error: "errorTest" },
    });
    expect(newState.length).toEqual(1);
    expect(newState).toEqual(["errorTest"]);
  });

  it("Removing error", () => {
    const newState = errors(["errorTest"], {
      type: "REMOVE_ERROR",
      payload: { index: 0 },
    });
    expect(newState.length).toEqual(0);
    expect(newState).toEqual([]);
  });

  it("default", () => {
    const newState = errors(["errorTest"], {
      type: "DEFAULT",
    });
    expect(newState.length).toEqual(1);
    expect(newState).toEqual(["errorTest"]);
  });
});
