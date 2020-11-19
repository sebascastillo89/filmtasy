import films from "./films";

describe("Films reducers", () => {
  describe("Request", () => {
    it("fetch all films (REQUEST)", () => {
      const newState = films(
        {
          isFetching: false,
          isCached: false,
          items: [],
        },
        { type: "FETCH_ALL_FILMS_REQUEST" }
      );
      expect(newState.isFetching).toEqual(true);
    });
  });
  describe("Success", () => {
    it("fetch all films (SUCCESS)", () => {
      const newState = films(
        {
          isFetching: true,
          isCached: false,
          items: [],
        },
        {
          type: "FETCH_ALL_FILMS_SUCCESS",
          payload: {
            films: [
              {
                id: 1,
                url: "/films/1",
                characters: ["/people/2"],
              },
            ],
          },
        }
      );
      expect(newState.isFetching).toEqual(false);
      expect(newState.isCached).toEqual(true);
      expect(newState.items.length).toEqual(1);
    });
  });
  describe("Error", () => {
    it("fetch all films (ERROR)", () => {
      const newState = films(
        {
          isFetching: true,
          isCached: false,
          items: [{ id: 1 }],
        },
        { type: "FETCH_ALL_FILMS_ERROR" }
      );
      expect(newState.isFetching).toEqual(false);
      expect(newState.items.length).toEqual(0);
    });
  });
  describe("Skip", () => {
    it("fetch all films (SKIP)", () => {
      const newState = films(
        {
          isFetching: true,
          isCached: false,
          items: [{ id: 1 }],
        },
        { type: "FETCH_ALL_FILMS_SKIP" }
      );
      expect(newState.isFetching).toEqual(false);
      expect(newState.items.length).toEqual(1);
    });
  });
  describe("Add", () => {
    it("Add film", () => {
      const newState = films(
        {
          isFetching: true,
          isCached: false,
          items: [{ id: 1 }],
        },
        {
          type: "ADD_FILM",
          payload: {
            film: {
              id: 1,
              url: "/films/1",
              characters: ["/people/2"],
            },
          },
        }
      );
      expect(newState.items.length).toEqual(2);
    });
  });
  describe("Default", () => {
    it("Default", () => {
      const newState = films(
        {
          isFetching: true,
          isCached: false,
          items: [{ id: 1 }],
        },
        {
          type: "DEFAULT",
        }
      );
      expect(newState).toEqual({
        isFetching: true,
        isCached: false,
        items: [{ id: 1 }],
      });
    });
  });
});
