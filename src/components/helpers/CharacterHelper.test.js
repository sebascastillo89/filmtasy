import * as Helper from "./CharacterHelper";

describe("Character Helper", () => {
  describe("getIdFromUrl", () => {
    it("When valid url is specified, then return char id", () => {
      const result = Helper.getIdFromUrl("api/people/6/");
      expect(result).toBe(6);
    });

    it("When url contains invalid id, then return char id", () => {
      const result = Helper.getIdFromUrl("api/people/NaN/");
      expect(result).toBe(null);
    });

    it("When valid url is specified, then return null", () => {
      const result = Helper.getIdFromUrl("api/invalidUri/6");
      expect(result).toBe(null);
    });

    it("When id is not specified, then return null", () => {
      const result = Helper.getIdFromUrl();
      expect(result).toBe(null);
    });
  });

  describe("getCharImage", () => {
    it("When valid id is specified, then return url", () => {
      const result = Helper.getCharImage(2);
      expect(result).toBe(
        "https://lumiere-a.akamaihd.net/v1/images/c3po-on-bridge_06785c6b.jpeg?width=600"
      );
    });

    it("When invalid id is specified, then return default", () => {
      const result = Helper.getCharImage("NaN");
      expect(result).toBe(
        "https://lumiere-a.akamaihd.net/v1/images/screen_shot_2015-07-24_at_1_84da9ffb.jpeg?width=600"
      );
    });
  });
});
