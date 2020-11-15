import axios from "axios";
import { addError } from "./errorActions";

const GET_FILMS_URI = "https://swapi.dev/api/films/";

export const fetchAllFilmsRequest = () => ({
  type: "FETCH_ALL_FILMS_REQUEST",
});

export const fetchAllFilmsSkip = () => ({
  type: "FETCH_ALL_FILMS_SKIP",
});

export const fetchAllFilmsSuccess = (json) => ({
  type: "FETCH_ALL_FILMS_OK",
  payload: { films: json },
});

export const fetchAllFilmsFailure = () => ({
  type: "FETCH_ALL_FILMS_ERROR",
});

// THUNK ACTION FOR FETCH FILMS
export function fetchAllFilms() {
  return function (dispatch, getState) {
    dispatch(fetchAllFilmsRequest());
    if (getState().films.isCached) {
      dispatch(fetchAllFilmsSkip());
    } else {
      return axios.get(GET_FILMS_URI).then(
        (json) => {
          dispatch(fetchAllFilmsSuccess(json.data.results));
        },
        (error) => {
          dispatch(fetchAllFilmsFailure());
          dispatch(addError("errorFetchingFilms"));
        }
      );
    }
  };
}
