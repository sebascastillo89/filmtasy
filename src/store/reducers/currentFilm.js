const initialState = {
  id: null,
  isFetchingFilm: false,
  isFetchingCharacters: false,
  isFailure: false,
};

export default function currentFilm(state = initialState, action) {
  const FETCH_FILM_REQUEST = "FETCH_FILM_REQUEST";
  const FETCH_FILM_SUCCESS = "FETCH_FILM_SUCCESS";
  const FETCH_FILM_ERROR = "FETCH_FILM_ERROR";
  const FETCH_FILM_SKIP = "FETCH_FILM_SKIP";
  const FETCH_FILM_CHARACTERS_SUCCESS = "FETCH_FILM_CHARACTERS_SUCCESS";

  switch (action.type) {
    case FETCH_FILM_REQUEST:
      return {
        ...state,
        id: action.payload.filmId,
        isFetchingFilm: true,
        isFetchingCharacters: true,
        isFailure: false,
      };
    case FETCH_FILM_SUCCESS:
      return {
        ...state,
        isFetchingFilm: false,
        isFailure: false,
      };
    case FETCH_FILM_ERROR:
      return {
        ...state,
        isFetchingFilm: false,
        isFetchingCharacters: false,
        isFailure: true,
      };
    case FETCH_FILM_SKIP:
      return {
        ...state,
        isFetchingFilm: false,
        isFetchingCharacters: false,
      };
    case FETCH_FILM_CHARACTERS_SUCCESS:
      return {
        ...state,
        isFetchingCharacters: false,
      };
    default:
      return state;
  }
}
