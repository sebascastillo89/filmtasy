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
export const fetchAllFilms = () => async (dispatch, getState) => {
  dispatch(fetchAllFilmsRequest());
  if (getState().films.isCached) {
    dispatch(fetchAllFilmsSkip());
  } else {
    // ENABLE THIS CONSOLE LOG TO ENSURE API IS CALLED ONLY ONCE
    //console.log("GET_FILMS_URI");
    try {
      const { data } = await axios.get(GET_FILMS_URI);
      dispatch(fetchAllFilmsSuccess(data.results));
    } catch (error) {
      dispatch(fetchAllFilmsFailure());
      dispatch(errorActions.addError("errorFetchingFilms"));
    }
  }
};
