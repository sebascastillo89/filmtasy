import films from "./films";

describe("Films reducers", () => {
  describe("REQUEST", () => {
    it("When fetch films, then update films state", () => {
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
  describe("SUCCESS", () => {
    it("When fetch films successfully, then update films state and add the new film", () => {
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
  describe("FAILURE", () => {
    it("When fetch films with errors, then update films state", () => {
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
  describe("SKIP", () => {
    it("When skip films request, then update films state", () => {
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
  describe("ADD", () => {
    it("When add new film, then update films state", () => {
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
  describe("DEFAULT", () => {
    it("When default action is dispatched, then return the same error", () => {
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
