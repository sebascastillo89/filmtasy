import axios from "axios";
const GET_FILMS_URI = "https://swapi.dev/api/films/";

export const fetchFilmRequest = (filmId) => ({
  type: "FETCH_FILM_REQUEST",
  payload: { filmId: filmId },
});

export const fetchFilmSuccess = () => ({
  type: "FETCH_FILM_OK",
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
      //TODO ERROR
      dispatch(fetchFilmFailure());
    } else {
      const id = parseInt(filmId);
      dispatch(fetchFilmRequest(id));

      const isCached = getState().films.isCached;
      const film = getState().films.items.find((obj) => obj.id === id);

      if (isCached || film) {
        dispatch(skipFetchFilm(filmId));
      } else {
        console.log("GET SINGLE FILM");
        return axios.get(GET_FILMS_URI + filmId).then(
          (json) => {
            dispatch(fetchFilmSuccess());
            dispatch(addFilm(json.data));
          },
          (error) => {
            //TODO call error reducer
            dispatch(fetchFilmFailure());
          }
        );
      }
    }
  };
}
