import * as Helper from "./FilmsHelper";

describe("Films Helper", () => {
  describe("getIdFromUrl", () => {
    it("When valid url is specified, then return id", () => {
      const result = Helper.getIdFromUrl("api/films/6/");
      expect(result).toBe(6);
    });

    it("When url contains invalid id is specified, then return null", () => {
      const result = Helper.getIdFromUrl("api/films/NaN/");
      expect(result).toBe(null);
    });

    it("When invalid url is specified, then return null", () => {
      const result = Helper.getIdFromUrl("api/invalidUri/6");
      expect(result).toBe(null);
    });
  });

  describe("mapJsonToFilm", () => {
    const json = {
      title: "mytitle",
      episode_id: "ep",
      opening_crawl: "oc",
      director: "director",
      producer: "producer",
      release_date: "rd",
      url: "api/films/6/",
      characters: null,
    };

    it("When valid json is specified, then return a film", () => {
      const result = Helper.mapJsonToFilm(json);
      expect(result.id).toBe(6);
      expect(result.characters).toBe(undefined);
    });

    it("When valid json is specified and include characters, then return a film", () => {
      const result = Helper.mapJsonToFilm({
        ...json,
        characters: ["/people/1/"],
      });
      expect(result.id).toBe(6);
      expect(result.characters.length).toBe(1);
      expect(result.characters[0]).toBe(1);
    });

    it("When json contains invalid url, then returns null", () => {
      const result = Helper.mapJsonToFilm({ ...json, url: "invalid" });
      expect(result).toBe(null);
    });

    it("When json is not specified, then returns null list", () => {
      const result = Helper.mapJsonToFilm();
      expect(result).toBe(null);
    });

    it("When json is not specified, then returns empty film list", () => {
      const result = Helper.mapJsonToFilms();
      expect(result.length).toBe(0);
    });

    it("When valid json is specified, then return a array of film", () => {
      const result = Helper.mapJsonToFilms([json]);
      expect(result.length).toBe(1);
      expect(result[0].id).toBe(6);
    });
  });

  describe("getSubtitle", () => {
    it("null film", () => {
      const result = Helper.getSubtitle();
      expect(result).toBe("");
    });

    it("only episode", () => {
      const result = Helper.getSubtitle({ episode_id: "ep" });
      expect(result).toBe("Episode ep");
    });

    it("only year", () => {
      const result = Helper.getSubtitle({ release_date: "12/12/2020" });
      expect(result).toBe(" - 2020");
    });

    it("both", () => {
      const result = Helper.getSubtitle({
        episode_id: "ep",
        release_date: "12/12/2020",
      });
      expect(result).toBe("Episode ep - 2020");
    });
  });

  describe("setFetchingByFilmId", () => {
    it("null items", () => {
      const result = Helper.setFetchingByFilmId(null, 1, 1);
      expect(result).toBe(null);
    });

    it("invalid id", () => {
      const result = Helper.setFetchingByFilmId(2, "a", 1);
      expect(result).toBe(2);
    });

    it("invalid film", () => {
      const result = Helper.setFetchingByFilmId([{ id: 1 }], 2, 1);
      expect(result[0].id).toBe(1);
    });

    it("invalid film id", () => {
      const result = Helper.setFetchingByFilmId(
        [{ id: 1, isFetching: false }],
        2,
        true
      );
      expect(result[0].id).toBe(1);
      expect(result[0].isFetching).toBe(false);
    });

    it("update", () => {
      const result = Helper.setFetchingByFilmId(
        [{ id: 1, isFetching: false }],
        1,
        true
      );
      expect(result[0].id).toBe(1);
      expect(result[0].isFetching).toBe(true);
    });
  });

  describe("setFetchingCharactersByFilmId", () => {
    it("null items", () => {
      const result = Helper.setFetchingCharactersByFilmId(null, 1, 1);
      expect(result).toBe(null);
    });

    it("invalid id", () => {
      const result = Helper.setFetchingCharactersByFilmId(2, "a", 1);
      expect(result).toBe(2);
    });

    it("invalid film", () => {
      const result = Helper.setFetchingCharactersByFilmId([{ id: 1 }], 2, 1);
      expect(result[0].id).toBe(1);
    });

    it("invalid film id", () => {
      const result = Helper.setFetchingCharactersByFilmId(
        [{ id: 1, isFetchingCharacters: false }],
        2,
        true
      );
      expect(result[0].id).toBe(1);
      expect(result[0].isFetchingCharacters).toBe(false);
    });

    it("update", () => {
      const result = Helper.setFetchingCharactersByFilmId(
        [{ id: 1, isFetching: false }],
        1,
        true
      );
      expect(result[0].id).toBe(1);
      expect(result[0].isFetchingCharacters).toBe(true);
    });
  });
});
