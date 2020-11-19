import * as Helper from "./CharacterHelper";

describe("Character Helper", () => {
  describe("getIdFromUrl", () => {
    it("Valid url", () => {
      const result = Helper.getIdFromUrl("api/people/6/");
      expect(result).toBe(6);
    });
    it("Invalid url", () => {
      const result = Helper.getIdFromUrl("api/invalidUri/6");
      expect(result).toBe(null);
    });
  });
});
