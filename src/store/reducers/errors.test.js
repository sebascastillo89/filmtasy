import errors from "./errors";

describe("Error reducers", () => {
  describe("ADD", () => {
    it("Adding error", () => {
      const newState = errors([], {
        type: "ADD_ERROR",
        payload: { error: "errorTest" },
      });
      expect(newState.length).toEqual(1);
      expect(newState).toEqual(["errorTest"]);
    });
  });
  describe("SKIP", () => {
    it("Adding existing error", () => {
      const newState = errors(["errorTest"], {
        type: "ADD_ERROR",
        payload: { error: "errorTest" },
      });
      expect(newState.length).toEqual(1);
      expect(newState).toEqual(["errorTest"]);
    });
  });
  describe("REMOVE", () => {
    it("Removing error", () => {
      const newState = errors(["errorTest"], {
        type: "REMOVE_ERROR",
        payload: { index: 0 },
      });
      expect(newState.length).toEqual(0);
      expect(newState).toEqual([]);
    });
  });
  describe("DEFAULT", () => {
    it("default", () => {
      const newState = errors(["errorTest"], {
        type: "DEFAULT",
      });
      expect(newState.length).toEqual(1);
      expect(newState).toEqual(["errorTest"]);
    });
  });
});
