import axios from "axios";
import * as errorActions from "./errorActions";

const GET_CHARACTER_URI = "https://swapi.dev/api/people/";

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

export const fetchCharacterSuccess = (characterId) => ({
  type: "FETCH_CHARACTER_SUCCESS",
  payload: { characterId: characterId },
});

export const fetchFilmCharacterFailure = () => ({
  type: "FETCH_FILM_CHARACTER_FAILURE",
});

export const fetchCharacterFailure = () => ({
  type: "FETCH_CHARACTER_FAILURE",
});

export const skipFetchCharacter = () => ({
  type: "SKIP_FETCH_CHARACTER",
});

export const addCharacter = (id, success, json) => ({
  type: "ADD_CHARACTER",
  payload: { characterId: id, success: success, character: json },
});

export const fetchFilmCharactersSuccess = (filmId) => ({
  type: "FETCH_FILM_CHARACTERS_SUCCESS",
  payload: { filmId: filmId },
});

// THUNK ACTION FOR FETCH SINGLE CHARACTER
export const fetchCharacter = (characterId) => (dispatch, getState) => {
  const charId = parseInt(characterId);
  dispatch(fetchCharacterRequest(charId));

  const character = getState().characters.find(
    (character) => character.id === charId
  );

  if (!character || character.isFailure) {
    return axios
      .get(GET_CHARACTER_URI + charId + "/", null, {
        headers: {
          "Content-Type": "application/json; charset=utf-8",
        },
      })
      .then(function (response) {
        const { data } = response;
        dispatch(fetchCharacterSuccess(charId));
        dispatch(addCharacter(charId, true, data));
        dispatch(checkFilmCharacters());
      })
      .catch(function (error) {
        dispatch(fetchCharacterFailure());
        dispatch(errorActions.addError("errorFetchingCharacter"));
        dispatch(addCharacter(charId, false, null));
        dispatch(checkFilmCharacters());
      });
  } else {
    dispatch(skipFetchCharacter(charId));
    dispatch(checkFilmCharacters());
  }
};

export const checkFilmCharacters = () => (dispatch, getState) => {
  if (getState().currentFilm.isFetchingCharacters) {
    const currentFilm = getState().films.items.find(
      (obj) => obj.id === getState().currentFilm.id
    );
    let stillFetching = false;
    for (const filmCharacter of currentFilm.characters) {
      const characterId = filmCharacter;
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
