import axios from "axios";
import { addError } from "./errorActions";
const GET_FILMS_URI = "https://swapi.dev/api/films/";

export const fetchFilmRequest = (filmId) => ({
  type: "FETCH_FILM_REQUEST",
  payload: { filmId: filmId },
});

export const fetchFilmSuccess = () => ({
  type: "FETCH_FILM_SUCCESS",
});

export const addFilm = (json) => ({
  type: "ADD_FILM",
  payload: { film: json },
});

export const skipFetchFilm = (filmId) => ({
  type: "FETCH_FILM_SKIP",
  payload: { filmId: filmId },
});

export const fetchFilmFailure = () => ({
  type: "FETCH_FILM_ERROR",
});

// THUNK ACTION FOR FETCH A SINGLE FILM
export function fetchFilm(filmId) {
  return function (dispatch, getState) {
    if (!Number.isInteger(filmId)) {
      dispatch(addError("errorFetchingFilm"));
      dispatch(fetchFilmFailure());
    } else {
      const id = parseInt(filmId);
      const isAlreadyCurrent = getState().currentFilm.id === id;

      if (!isAlreadyCurrent) {
        dispatch(fetchFilmRequest(id));

        const isCached =
          getState().films.isCached ||
          getState().films.items.find((obj) => obj.id === id);
        if (isCached) {
          dispatch(skipFetchFilm(id));
        } else {
          // ENABLE THIS CONSOLE LOG TO ENSURE API IS CALLED ONLY ONCE
          //console.log("GET_FILMS_URI " + id);
          return axios.get(GET_FILMS_URI + id).then(
            (json) => {
              dispatch(fetchFilmSuccess());
              dispatch(addFilm(json.data));
            },
            (error) => {
              dispatch(addError("errorFetchingFilm"));
              dispatch(fetchFilmFailure());
            }
          );
        }
      }
    }
  };
}
