const GET_FILMS_URI = "https://swapi.dev/api/films";
const GET_CHARACTER_URI = "https://swapi.dev/api/people/";

// FETCHING FILMS
export const fetchFilmsRequest = () => ({
  type: "FETCH_FILMS_REQUEST",
});

export const fetchFilmsSuccess = (json) => ({
  type: "FETCH_FILMS_SUCCESS",
  payload: { films: json },
});

export const fetchFilmsFailure = (error) => ({
  type: "FETCH_FILMS_FAILURE",
  payload: { errorMessage: error },
});

// SELECTING FILM
export const selectFilmRequest = (filmIndex) => ({
  type: "SELECT_FILM_REQUEST",
  payload: filmIndex,
});

export const skipFetchCharacter = (characterId) => ({
  type: "SKIP_FETCH_CHARACTER",
  payload: characterId,
});

// FETCHING CHARACTERS
export const fetchCharacterRequest = (characterId) => ({
  type: "FETCH_CHARACTER_REQUEST",
  payload: characterId,
});

export const fetchCharacterSuccess = (characterId, json) => ({
  type: "FETCH_CHARACTER_SUCCESS",
  payload: { characterId: characterId, character: json },
});

export const fetchCharacterFailure = (error) => ({
  type: "FETCH_CHARACTER_FAILURE",
  payload: { errorMessage: error },
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
export function fetchFilms() {
  return function (dispatch) {
    dispatch(fetchFilmsRequest());

    return fetch(GET_FILMS_URI)
      .then((response) => response.json())
      .then(
        (json) => {
          dispatch(fetchFilmsSuccess(json.results));
        },
        (error) => {
          dispatch(fetchFilmsFailure("Ups! There was an error loading films"));
        }
      );
  };
}

// THUNK ACTION FOR SELECTING FILM
export function selectFilm(filmIndex) {
  return function (dispatch, getState) {
    dispatch(selectFilmRequest(filmIndex));

    const filmCharacters = [...getState().card.characters];
    filmCharacters.map((characterId) => {
      const character = getState().characters[characterId];
      if (!character) {
        return dispatch(fetchCharacter(characterId));
      } else {
        return dispatch(skipFetchCharacter(characterId));
      }
    });
  };
}

// THUNK ACTION FOR CHARACTERS
export function fetchCharacter(characterId) {
  return function (dispatch) {
    dispatch(fetchCharacterRequest(characterId));

    return fetch(GET_CHARACTER_URI + characterId)
      .then((response) => response.json())
      .then(
        (json) => {
          dispatch(fetchCharacterSuccess(characterId, json));
        },
        (error) => {
          dispatch(
            fetchCharacterFailure("Ups! There was an error loading characters")
          );
        }
      );
  };
}
