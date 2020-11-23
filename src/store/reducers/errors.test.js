import errors from "./errors";

describe("Error reducers", () => {
  describe("ADD", () => {
    it("When add new error, then include it in errors state", () => {
      const newState = errors([], {
        type: "ADD_ERROR",
        payload: { error: "errorTest" },
      });
      expect(newState.length).toEqual(1);
      expect(newState).toEqual(["errorTest"]);
    });
  });
  describe("SKIP", () => {
    it("When add existing error, then include anything", () => {
      const newState = errors(["errorTest"], {
        type: "ADD_ERROR",
        payload: { error: "errorTest" },
      });
      expect(newState.length).toEqual(1);
      expect(newState).toEqual(["errorTest"]);
    });
  });
  describe("REMOVE", () => {
    it("When remove existing error, then splice current error state", () => {
      const newState = errors(["errorTest"], {
        type: "REMOVE_ERROR",
        payload: { index: 0 },
      });
      expect(newState.length).toEqual(0);
      expect(newState).toEqual([]);
    });
  });
  describe("DEFAULT", () => {
    it("When default action dispatched, then return the same state", () => {
      const newState = errors(["errorTest"], {
        type: "DEFAULT",
      });
      expect(newState.length).toEqual(1);
      expect(newState).toEqual(["errorTest"]);
    });
  });
});
