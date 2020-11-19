import characters from "./characters";

describe("Characters reducers", () => {
  describe("Fetch film characters", () => {
    describe("Request", () => {
      it("fetch character (REQUEST)", () => {
        const newState = characters([], {
          type: "FETCH_FILM_CHARACTER_REQUEST",
          payload: { characterId: 1 },
        });
        expect(newState.length).toEqual(1);
        expect(newState).toEqual([{ id: 1, isFetching: true }]);
      });
    });
    describe("Success", () => {
      it("fetch character (SUCCESS AND EMPTY)", () => {
        const newState = characters([], {
          type: "FETCH_FILM_CHARACTER_SUCCESS",
          payload: { characterId: 1 },
        });
        expect(newState.length).toEqual(0);
        expect(newState).toEqual([]);
      });

      it("fetch character (SUCCESS)", () => {
        const newState = characters([{ id: 1, isFetching: true }], {
          type: "FETCH_FILM_CHARACTER_SUCCESS",
          payload: { characterId: 1, character: { name: "char2" } },
        });
        expect(newState.length).toEqual(1);
        expect(newState).toEqual([
          {
            id: 1,
            isFetching: false,
            item: {
              name: "char2",
              id: 1,
            },
          },
        ]);
      });
    });
    describe("Error", () => {
      it("fetch character (ERROR AND EMPTY)", () => {
        const newState = characters([], {
          type: "FETCH_FILM_CHARACTER_FAILURE",
          payload: { characterId: 1 },
        });
        expect(newState).toEqual([]);
      });

      it("fetch character (ERROR)", () => {
        const newState = characters([{ id: 1, isFetching: true }], {
          type: "FETCH_FILM_CHARACTER_FAILURE",
          payload: { characterId: 1 },
        });
        expect(newState).toEqual([{ id: 1, isFetching: false, item: null }]);
      });
    });
  });

  describe("Add new character", () => {
    it("add character", () => {
      const newState = characters([{ id: 1, isFetching: true }], {
        type: "ADD_CHARACTER",
        payload: {
          characterId: 1,
          success: true,
          character: { name: "charName" },
        },
      });
      expect(newState).toEqual([
        {
          id: 1,
          isFetching: false,
          isFailure: false,
          item: {
            name: "charName",
            id: 1,
          },
        },
      ]);
    });
  });

  describe("Default case", () => {
    it("default", () => {
      const newState = characters([{ id: 1, isFetching: true }], {
        type: "default",
      });
      expect(newState).toEqual([{ id: 1, isFetching: true }]);
    });
  });
});
