import characters from "./characters";

describe("Characters reducers", () => {
  describe("Fetching films characters", () => {
    describe("REQUEST", () => {
      it("When request characters, then include fetching char in state", () => {
        const newState = characters([], {
          type: "FETCH_FILM_CHARACTER_REQUEST",
          payload: { characterId: 1 },
        });
        expect(newState.length).toEqual(1);
        expect(newState).toEqual([{ id: 1, isFetching: true }]);
      });
    });
    describe("SUCCESS", () => {
      it("When fetch successfully, then include item in state", () => {
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

      it("When fetch successfully without data, should return the same state", () => {
        const newState = characters([], {
          type: "FETCH_FILM_CHARACTER_SUCCESS",
          payload: { characterId: 1 },
        });
        expect(newState.length).toEqual(0);
        expect(newState).toEqual([]);
      });
    });

    describe("FAILURE", () => {
      it("When fetch with errors, update this char instate", () => {
        const newState = characters([{ id: 1, isFetching: true }], {
          type: "FETCH_FILM_CHARACTER_FAILURE",
          payload: { characterId: 1 },
        });
        expect(newState).toEqual([{ id: 1, isFetching: false, item: null }]);
      });

      it("When fetch with errors and char does not exists, should return the same state", () => {
        const newState = characters([], {
          type: "FETCH_FILM_CHARACTER_FAILURE",
          payload: { characterId: 1 },
        });
        expect(newState).toEqual([]);
      });
    });
  });

  describe("Adding new character", () => {
    it("When character is specified, then add to state", () => {
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
            image:
              "https://lumiere-a.akamaihd.net/v1/images/screen_shot_2015-07-24_at_1_84da9ffb.jpeg?width=600",
          },
        },
      ]);
    });

    it("When character is specified but it does not exist, then add new char to state", () => {
      const newState = characters([{ id: 2, isFetching: true }], {
        type: "ADD_CHARACTER",
        payload: {
          characterId: 1,
          success: true,
          character: { name: "charName" },
        },
      });
      expect(newState).toEqual([
        { id: 2, isFetching: true },
        {
          id: 1,
          isFailure: false,
          isFetching: false,
          item: {
            id: 1,
            image:
              "https://lumiere-a.akamaihd.net/v1/images/screen_shot_2015-07-24_at_1_84da9ffb.jpeg?width=600",
            name: "charName",
          },
        },
      ]);
    });
  });

  describe("Default case", () => {
    it("When default action dispatched, then return the same state", () => {
      const newState = characters([{ id: 1, isFetching: true }], {
        type: "default",
      });
      expect(newState).toEqual([{ id: 1, isFetching: true }]);
    });
  });
});
