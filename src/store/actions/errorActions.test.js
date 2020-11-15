import * as Action from "./errorActions";

describe("Errors actions", () => {
  describe("Adding a new error", () => {
    it("addError", () => {
      const action = Action.addError("errorMsg");
      expect(action).toEqual({
        type: "ADD_ERROR",
        payload: { error: "errorMsg" },
      });
    });

    it("removeError", () => {
      const action = Action.removeError(3);
      expect(action).toEqual({
        type: "REMOVE_ERROR",
        payload: { index: 3 },
      });
    });
  });
});
