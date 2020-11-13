import axios from "axios";
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
      //Enable this line to ensure api request are caching
      console.log("GET ALL FILMS");
      return axios.get(GET_FILMS_URI).then(
        (json) => {
          dispatch(fetchAllFilmsSuccess(json.data.results));
        },
        (error) => {
          //TODO llamar tambien al reducer de errores
          dispatch(fetchAllFilmsFailure());
        }
      );
    }
  };
}
