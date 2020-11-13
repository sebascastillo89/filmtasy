const initialState = {
  id: null,
  isFetchingFilm: false,
  isFetchingCharacters: false,
};

export default function currentFilm(state = initialState, action) {
  const FETCH_FILM_REQUEST = "FETCH_FILM_REQUEST";
  const FETCH_FILM_OK = "FETCH_FILM_OK";
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
      };
    case FETCH_FILM_OK:
      return {
        ...state,
        isFetchingFilm: false,
      };
    case FETCH_FILM_ERROR:
      return {
        ...state,
        isFetchingFilm: false,
        isFetchingCharacters: false,
      };
    case FETCH_FILM_SKIP:
      return {
        ...state,
        isFetchingFilm: false,
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
