export default function characters(state = [], action) {
  const FETCH_FILM_CHARACTER_REQUEST = "FETCH_FILM_CHARACTER_REQUEST";
  const FETCH_FILM_CHARACTER_SUCCESS = "FETCH_FILM_CHARACTER_SUCCESS";
  const FETCH_FILM_CHARACTER_FAILURE = "FETCH_FILM_CHARACTER_FAILURE";
  const ADD_CHARACTER = "ADD_CHARACTER";

  switch (action.type) {
    case FETCH_FILM_CHARACTER_REQUEST:
      return [...state, { id: action.payload.characterId, isFetching: true }];
    case FETCH_FILM_CHARACTER_SUCCESS:
      const newChars = [...state];
      const charIndex = newChars.findIndex(
        (char) => char.id === action.payload.characterId
      );

      newChars[charIndex] = {
        ...newChars[charIndex],
        isFetching: false,
        item: {
          ...action.payload.character,
          id: action.payload.characterId,
          isFavourite: false,
        },
      };

      return newChars;
    case FETCH_FILM_CHARACTER_FAILURE:
      const newChars3 = [...state];
      const charIndex3 = newChars3.findIndex(
        (char) => char.id === action.payload.characterId
      );

      newChars3[charIndex3] = {
        ...newChars3[charIndex3],
        isFetching: false,
        item: null,
      };

      return newChars3;
    case ADD_CHARACTER:
      return [
        ...state,
        {
          id: action.payload.characterId,
          isFetching: false,
          item: {
            ...action.payload.character,
            id: action.payload.characterId,
            isFavourite: false,
          },
        },
      ];
    default:
      return state;
  }
}
