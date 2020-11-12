const initialState = {
  id: null,
  isFetchingFilm: false,
  isFetchingCharacters: false,
};

export default function currentFilm(state = initialState, action) {
  const FETCH_FILM_REQUEST = "FETCH_FILM_REQUEST";
  const FETCH_FILM_SUCCESS = "FETCH_FILM_SUCCESS";
  const FETCH_FILM_FAILURE = "FETCH_FILM_FAILURE";
  const SKIP_FETCH_FILM = "SKIP_FETCH_FILM";
  const FETCH_FILM_CHARACTERS_SUCCESS = "FETCH_FILM_CHARACTERS_SUCCESS";

  switch (action.type) {
    case FETCH_FILM_REQUEST:
      return {
        ...state,
        id: action.payload.filmId,
        isFetchingFilm: true,
        isFetchingCharacters: true,
      };
    case FETCH_FILM_SUCCESS:
      return {
        ...state,
        isFetchingFilm: false,
      };
    case FETCH_FILM_FAILURE:
      return {
        ...state,
        id: null,
        isFetchingFilm: false,
        isFetchingCharacters: false,
      };
    case SKIP_FETCH_FILM:
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
