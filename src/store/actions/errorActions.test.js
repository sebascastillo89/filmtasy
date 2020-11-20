import * as Action from "./errorActions";

describe("Errors actions", () => {
  describe("Adding a new error", () => {
    it("When error is thrown, then the payload include the error message", () => {
      const action = Action.addError("errorMsg");
      expect(action).toEqual({
        type: "ADD_ERROR",
        payload: { error: "errorMsg" },
      });
    });
    describe("Removing a new error", () => {
      it("When error is removed, then the payload include the error index", () => {
        const action = Action.removeError(3);
        expect(action).toEqual({
          type: "REMOVE_ERROR",
          payload: { index: 3 },
        });
      });
    });
  });
});
