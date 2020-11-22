import axios from "axios";
import * as errorActions from "./errorActions";

const GET_FILMS_URI = "https://swapi.dev/api/films/";

export const fetchAllFilmsRequest = () => ({
  type: "FETCH_ALL_FILMS_REQUEST",
});

export const fetchAllFilmsSkip = () => ({
  type: "FETCH_ALL_FILMS_SKIP",
});

export const fetchAllFilmsSuccess = (json) => ({
  type: "FETCH_ALL_FILMS_SUCCESS",
  payload: { films: json },
});

export const fetchAllFilmsFailure = () => ({
  type: "FETCH_ALL_FILMS_ERROR",
});

// THUNK ACTION FOR FETCH FILMS
export const fetchAllFilms = () => (dispatch, getState) => {
  dispatch(fetchAllFilmsRequest());
  if (getState().films.isCached) {
    dispatch(fetchAllFilmsSkip());
  } else {
    return axios
      .get(GET_FILMS_URI)
      .then(function (response) {
        const { data } = response;
        dispatch(fetchAllFilmsSuccess(data.results));
      })
      .catch(function (error) {
        dispatch(fetchAllFilmsFailure());
        dispatch(errorActions.addError("errorFetchingFilms"));
      });
  }
};
