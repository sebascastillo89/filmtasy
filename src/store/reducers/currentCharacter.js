const initialState = {
  id: null,
  isFetching: false,
};

export default function currentCharacter(state = initialState, action) {
  const FETCH_CHARACTER_REQUEST = "FETCH_CHARACTER_REQUEST";
  const FETCH_CHARACTER_SUCCESS = "FETCH_CHARACTER_SUCCESS";
  const FETCH_CHARACTER_FAILURE = "FETCH_CHARACTER_FAILURE";
  const SKIP_FETCH_CHARACTER = "SKIP_FETCH_CHARACTER";

  switch (action.type) {
    case FETCH_CHARACTER_REQUEST:
      return {
        ...state,
        id: action.payload.characterId,
        isFetching: true,
      };
    case FETCH_CHARACTER_SUCCESS:
      return {
        ...state,
        isFetching: false,
      };
    case FETCH_CHARACTER_FAILURE:
      return {
        ...state,
        isFetching: false,
      };
    case SKIP_FETCH_CHARACTER:
      return {
        ...state,
        isFetching: false,
      };
    default:
      return state;
  }
}
