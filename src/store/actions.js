import axios from "axios";
import * as CharactersHelper from "../components/characters/CharacterHelper";

const GET_FILMS_URI = "https://swapi.dev/api/films/";
const GET_CHARACTER_URI = "https://swapi.dev/api/people/";

// FETCHING ALL FILMS
export const fetchAllFilmsRequest = () => ({
  type: "FETCH_ALL_FILMS_REQUEST",
});

export const skipFetchAllFilms = () => ({
  type: "SKIP_FETCH_ALL_FILMS",
});

export const fetchAllFilmsSuccess = (json) => ({
  type: "FETCH_ALL_FILMS_SUCCESS",
  payload: { films: json },
});

export const fetchAllFilmsFailure = (error) => ({
  type: "FETCH_ALL_FILMS_FAILURE",
  payload: { errorMessage: error },
});

// FETCHING SINGLE FILMS
export const fetchFilmRequest = (filmId) => ({
  type: "FETCH_FILM_REQUEST",
  payload: { filmId: filmId },
});

export const skipFetchFilm = (filmId) => ({
  type: "SKIP_FETCH_FILM",
  payload: { filmId: filmId },
});

export const fetchFilmSuccess = (json) => ({
  type: "FETCH_FILM_SUCCESS",
  payload: { film: json },
});

export const fetchFilmFailure = (error) => ({
  type: "FETCH_FILM_FAILURE",
  payload: { errorMessage: error },
});

// SELECTING FILM
export const selectFilmRequest = (filmIndex) => ({
  type: "SELECT_FILM_REQUEST",
  payload: filmIndex,
});

// FETCHING CHARACTERS

export const fetchFilmCharacterRequest = (characterId) => ({
  type: "FETCH_FILM_CHARACTER_REQUEST",
  payload: { characterId: characterId },
});

export const fetchCharacterRequest = (characterId) => ({
  type: "FETCH_CHARACTER_REQUEST",
  payload: { characterId: characterId },
});
export const fetchFilmCharacterSuccess = (characterId, json) => ({
  type: "FETCH_FILM_CHARACTER_SUCCESS",
  payload: { characterId: characterId, character: json },
});

export const fetchCharacterSuccess = (characterId, json) => ({
  type: "FETCH_CHARACTER_SUCCESS",
  payload: { characterId: characterId, character: json },
});

export const fetchFilmCharacterFailure = (error) => ({
  type: "FETCH_FILM_CHARACTER_FAILURE",
  payload: { errorMessage: error },
});

export const fetchCharacterFailure = (error) => ({
  type: "FETCH_CHARACTER_FAILURE",
  payload: { errorMessage: error },
});

export const skipFetchCharacter = (characterId) => ({
  type: "SKIP_FETCH_CHARACTER",
  payload: characterId,
});

export const fetchFilmCharactersSuccess = (filmId) => ({
  type: "FETCH_FILM_CHARACTERS_SUCCESS",
  payload: { filmId: filmId },
});
//PENDING TO REFACTOR

export const resetError = (index) => ({
  type: "RESET_ERROR",
  payload: { errorIndex: index },
});

// FAVOURITE FILMS
export const saveFilmAsFavourite = (index) => ({
  type: "SAVE_FAVOURITE_FILM",
  payload: { index: index },
});

export const removeFilmFromFavourite = (index) => ({
  type: "REMOVE_FAVOURITE_FILM",
  payload: { index: index },
});

// FAVOURITE CHARACTERS
export const saveCharacterAsFavourite = (index) => ({
  type: "SAVE_FAVOURITE_CHARACTER",
  payload: { index: index },
});

export const removeCharacterFromFavourite = (index) => ({
  type: "REMOVE_FAVOURITE_CHARACTER",
  payload: { index: index },
});

// SELECTING CHARACTER
export const selectCharacter = (characterIdex) => ({
  type: "SELECT_CHARACTER",
  payload: { index: characterIdex },
});

export const unselectCharacter = () => ({
  type: "UNSELECT_CHARACTER",
});

// THUNK ACTION FOR FILMS
export function fetchAllFilms() {
  return function (dispatch, getState) {
    dispatch(fetchAllFilmsRequest());

    if (getState().films.isCached) {
      dispatch(skipFetchAllFilms());
    } else {
      console.log("GET ALL FILMS");
      return axios.get(GET_FILMS_URI).then(
        (json) => {
          dispatch(fetchAllFilmsSuccess(json.data.results));
        },
        (error) => {
          dispatch(
            fetchAllFilmsFailure("Ups! There was an error loading films")
          );
        }
      );
    }
  };
}

export function fetchFilm(filmId) {
  return function (dispatch, getState) {
    const id = parseInt(filmId); //TODO Test
    dispatch(fetchFilmRequest(id));

    const isCached = getState().films.isCached;
    const film = getState().films.items.find((obj) => obj.id === id);

    if (isCached || film) {
      dispatch(skipFetchFilm(filmId));
    } else {
      console.log("GET SINGLE FILM");
      return axios.get(GET_FILMS_URI + filmId).then(
        (json) => {
          dispatch(fetchFilmSuccess(json.data));
        },
        (error) => {
          dispatch(fetchFilmFailure("Ups! There was an error loading films"));
        }
      );
    }
  };
}

// THUNK ACTION FOR CHARACTERS
export function fetchCharacters(filmId) {
  return function (dispatch, getState) {
    const film = getState().films.items.find(
      (film) => film.id === parseInt(filmId)
    );
    film.characters.map((character) => {
      return dispatch(
        fetchFilmCharacter(CharactersHelper.getIdFromUrl(character)),
        true
      );
    });
  };
}

export function fetchFilmCharacter(characterId) {
  return function (dispatch, getState) {
    const character = getState().characters.find(
      (character) => character.id === parseInt(characterId)
    );

    if (!character) {
      console.log("GET SINGLE CHARACTER");
      dispatch(fetchFilmCharacterRequest(characterId));
      axios.get(GET_CHARACTER_URI + characterId).then(
        (json) => {
          dispatch(fetchFilmCharacterSuccess(characterId, json.data));
          dispatch(checkFilmCharacters());
        },
        (error) => {
          dispatch(
            fetchFilmCharacterFailure(
              "Ups! There was an error loading character"
            )
          );
          dispatch(checkFilmCharacters());
        }
      );
    } else {
      dispatch(checkFilmCharacters());
    }
  };
}

export function fetchCharacter(characterId) {
  return function (dispatch, getState) {
    const charId = parseInt(characterId);
    dispatch(fetchCharacterRequest(charId));

    const character = getState().characters.find(
      (character) => character.id === parseInt(characterId)
    );

    if (!character) {
      console.log("GET SINGLE CHARACTER");
      axios.get(GET_CHARACTER_URI + characterId).then(
        (json) => {
          dispatch(fetchCharacterSuccess(charId, json.data));
        },
        (error) => {
          dispatch(
            fetchCharacterFailure("Ups! There was an error loading character")
          );
        }
      );
    } else {
      dispatch(skipFetchCharacter(charId));
    }
  };
}

export function checkFilmCharacters() {
  return function (dispatch, getState) {
    if (getState().currentFilm.isFetchingCharacters) {
      const currentFilm = getState().films.items.find(
        (obj) => obj.id === getState().currentFilm.id
      );

      let stillFetching = false;
      for (const filmCharacter of currentFilm.characters) {
        const characterId = CharactersHelper.getIdFromUrl(filmCharacter);
        const stateCharacter = getState().characters.find(
          (obj) => obj.id === characterId
        );

        if (!stateCharacter || stateCharacter.isFetching) {
          stillFetching = true;
          break;
        }
      }
      if (!stillFetching) {
        dispatch(fetchFilmCharactersSuccess(getState().currentFilm.id));
      }
    }
  };
}
