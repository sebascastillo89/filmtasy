import axios from "axios";

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

export const addCharacter = (id, json) => ({
  type: "ADD_CHARACTER",
  payload: { characterId: id, character: json },
});

export const fetchFilmCharactersSuccess = (filmId) => ({
  type: "FETCH_FILM_CHARACTERS_SUCCESS",
  payload: { filmId: filmId },
});

// THUNK ACTION FOR FETCH FILM CHARACTERS
export function fetchCharacters(filmId) {
  return function (dispatch, getState) {
    const film = getState().films.items?.find(
      (film) => film.id === parseInt(filmId)
    );
    film?.characters.map((characterId) => {
      return dispatch(fetchCharacter(characterId));
    });
  };
}

export function fetchCharacter(characterId) {
  return function (dispatch, getState) {
    if (!Number.isInteger(characterId)) {
      dispatch(fetchCharacterFailure());
    } else {
      const charId = parseInt(characterId);
      dispatch(fetchCharacterRequest(charId));

      const character = getState().characters.find(
        (character) => character.id === parseInt(characterId)
      );

      if (!character) {
        return axios.get(GET_CHARACTER_URI + characterId).then(
          (json) => {
            dispatch(fetchCharacterSuccess(charId));
            dispatch(addCharacter(characterId, json.data));
            dispatch(checkFilmCharacters());
          },
          (error) => {
            //TODO call error reducer
            dispatch(fetchCharacterFailure());
            dispatch(checkFilmCharacters());
          }
        );
      } else {
        dispatch(skipFetchCharacter(charId));
        dispatch(checkFilmCharacters());
      }
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
}
