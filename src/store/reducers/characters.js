export default function characters(state = [], action) {
  const FETCH_FILM_CHARACTER_REQUEST = "FETCH_FILM_CHARACTER_REQUEST";
  const FETCH_FILM_CHARACTER_SUCCESS = "FETCH_FILM_CHARACTER_SUCCESS";
  const FETCH_FILM_CHARACTER_FAILURE = "FETCH_FILM_CHARACTER_FAILURE";
  const ADD_CHARACTER = "ADD_CHARACTER";

  let newState = [...state];
  let index = -1;

  switch (action.type) {
    case FETCH_FILM_CHARACTER_REQUEST:
      return [...state, { id: action.payload.characterId, isFetching: true }];

    case FETCH_FILM_CHARACTER_SUCCESS:
      index = newState.findIndex(
        (char) => char.id === action.payload.characterId
      );
      if (index !== -1) {
        newState[index] = {
          ...newState[index],
          isFetching: false,
          item: {
            ...action.payload.character,
            id: action.payload.characterId,
          },
        };
      }
      return newState;

    case FETCH_FILM_CHARACTER_FAILURE:
      index = newState.findIndex(
        (char) => char.id === action.payload.characterId
      );
      if (index !== -1) {
        newState[index] = {
          ...newState[index],
          isFetching: false,
          item: null,
        };
      }
      return newState;

    case ADD_CHARACTER:
      index = newState.findIndex(
        (char) => char.id === action.payload.characterId
      );
      if (index !== -1) {
        newState.splice(index, 1);
      }
      return [
        ...newState,
        {
          id: action.payload.characterId,
          isFetching: false,
          isFailure: !action.payload.success,
          item: {
            ...action.payload.character,
            id: action.payload.characterId,
          },
        },
      ];

    default:
      return state;
  }
}
