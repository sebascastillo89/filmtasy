import * as FilmsHelper from "../../components/films/FilmsHelper";

const initialState = {
  isFetching: false,
  isCached: false,
  items: [],
};

export default function films(state = initialState, action) {
  const FETCH_ALL_FILMS_REQUEST = "FETCH_ALL_FILMS_REQUEST";
  const FETCH_ALL_FILMS_SUCCESS = "FETCH_ALL_FILMS_SUCCESS";
  const FETCH_ALL_FILMS_FAILURE = "FETCH_ALL_FILMS_FAILURE";
  const SKIP_FETCH_ALL_FILMS = "SKIP_FETCH_ALL_FILMS";
  const ADD_FILM = "ADD_FILM";

  switch (action.type) {
    case FETCH_ALL_FILMS_REQUEST:
      return {
        ...state,
        isFetching: true,
      };
    case FETCH_ALL_FILMS_SUCCESS:
      return {
        ...state,
        isFetching: false,
        isCached: true,
        items: FilmsHelper.mapJsonToFilms(action.payload.films),
      };
    case FETCH_ALL_FILMS_FAILURE:
      return {
        ...state,
        isFetching: false,
        isCached: false,
        items: [],
      };
    case SKIP_FETCH_ALL_FILMS:
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
