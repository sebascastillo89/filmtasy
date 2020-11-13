import * as FilmsHelper from "../../components/films/FilmsHelper";

const initialState = {
  isFetching: false,
  isCached: false,
  items: [],
};

export default function films(state = initialState, action) {
  const FETCH_ALL_FILMS_REQUEST = "FETCH_ALL_FILMS_REQUEST";
  const FETCH_ALL_FILMS_OK = "FETCH_ALL_FILMS_OK";
  const FETCH_ALL_FILMS_ERROR = "FETCH_ALL_FILMS_ERROR";
  const FETCH_ALL_FILMS_SKIP = "FETCH_ALL_FILMS_SKIP";
  const ADD_FILM = "ADD_FILM";

  switch (action.type) {
    case FETCH_ALL_FILMS_REQUEST:
      return {
        ...state,
        isFetching: true,
      };
    case FETCH_ALL_FILMS_OK:
      return {
        ...state,
        isFetching: false,
        isCached: true,
        items: FilmsHelper.mapJsonToFilms(action.payload.films),
      };
    case FETCH_ALL_FILMS_ERROR:
      return {
        ...state,
        isFetching: false,
        isCached: false,
        items: [],
      };
    case FETCH_ALL_FILMS_SKIP:
      return {
        ...state,
        isFetching: false,
      };
    case ADD_FILM:
      return {
        ...state,
        items: [...state.items, FilmsHelper.mapJsonToFilm(action.payload.film)],
      };
    default:
      return state;
  }
}
