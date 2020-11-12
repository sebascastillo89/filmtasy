import * as FilmsHelper from "../components/films/FilmsHelper";

/*
FILMTASY STATE MODEL
{
  errors: [],
  films: {
    isFetching: false, // If true, show spinner. If false, show Component
    isCached: false, //If true, all films are cached and unable to call API again.
    items: [
      {   
        id: 1   
        isFetching: false, // If true, show spinner. If false, show Component
        isFavourite: false, // If true, show FAV badge
        item: {...apiresponse}
      },
      {...} // items can contains multiple objects
    ]
  },
  characters: [
      {     
        isFetching: false, // If true, show spinner. If false, show Component
        isFavourite: false, // If true, show FAV badge
        item: {...apiresponse}
      },
      {...} // items can contains multiple objects
  ],
};
*/

const initialState = {
  errors: [],
  films: {
    isFetching: false,
    isCached: false,
    items: [],
  },
  currentFilm: {
    id: null,
    isFetchingFilm: false,
    isFetchingCharacters: false,
  },
  currentCharacter: {
    id: null,
    isFetching: false,
  },

  characters: [],
};

export default function reducer(state = initialState, action) {
  const RESET_ERROR = "RESET_ERROR";

  // Actions for show all films
  const FETCH_ALL_FILMS_REQUEST = "FETCH_ALL_FILMS_REQUEST";
  const FETCH_ALL_FILMS_SUCCESS = "FETCH_ALL_FILMS_SUCCESS";
  const FETCH_ALL_FILMS_FAILURE = "FETCH_ALL_FILMS_FAILURE";
  const SKIP_FETCH_ALL_FILMS = "SKIP_FETCH_ALL_FILMS";

  // Actions for show one film
  const FETCH_FILM_REQUEST = "FETCH_FILM_REQUEST";
  const FETCH_FILM_SUCCESS = "FETCH_FILM_SUCCESS";
  const FETCH_FILM_FAILURE = "FETCH_FILM_FAILURE";
  const SKIP_FETCH_FILM = "SKIP_FETCH_FILM";

  // Action for show film characters
  const FETCH_FILM_CHARACTER_REQUEST = "FETCH_FILM_CHARACTER_REQUEST";
  const FETCH_FILM_CHARACTER_SUCCESS = "FETCH_FILM_CHARACTER_SUCCESS";
  const FETCH_FILM_CHARACTER_FAILURE = "FETCH_FILM_CHARACTER_FAILURE";
  const FETCH_FILM_CHARACTERS_SUCCESS = "FETCH_FILM_CHARACTERS_SUCCESS";

  // Actions for show characters
  const FETCH_CHARACTER_REQUEST = "FETCH_CHARACTER_REQUEST";
  const FETCH_CHARACTER_SUCCESS = "FETCH_CHARACTER_SUCCESS";
  const FETCH_CHARACTER_FAILURE = "FETCH_CHARACTER_FAILURE";
  const SKIP_FETCH_CHARACTER = "SKIP_FETCH_CHARACTER";

  switch (action.type) {
    case RESET_ERROR:
      const newErrorList = [...state.errors];
      newErrorList.splice(action.payload.errorIndex, 1);
      return {
        ...state,
        errors: newErrorList,
      };
    case FETCH_ALL_FILMS_REQUEST:
      return {
        ...state,
        films: {
          ...state.films,
          isFetching: true,
        },
      };
    case SKIP_FETCH_ALL_FILMS:
      return {
        ...state,
        films: {
          ...state.films,
          isFetching: false,
        },
      };
    case FETCH_ALL_FILMS_SUCCESS:
      return {
        ...state,
        films: {
          ...state.films,
          isFetching: false,
          isCached: true,
          items: FilmsHelper.mapJsonToFilms(action.payload.films),
        },
      };
    case FETCH_ALL_FILMS_FAILURE:
      const newErrors =
        action.payload?.errorMessage != null
          ? [...state.errors, action.payload.errorMessage]
          : [...state.errors];
      return {
        ...state,
        errors: newErrors,
        films: {
          isFetching: false,
          isCached: false,
          items: [],
        },
      };
    case FETCH_FILM_REQUEST:
      return {
        ...state,
        currentFilm: {
          id: action.payload.filmId,
          isFetchingFilm: true,
          isFetchingCharacters: true,
        },
      };
    case SKIP_FETCH_FILM:
      return {
        ...state,
        currentFilm: {
          ...state.currentFilm,
          isFetchingFilm: false,
        },
      };
    case FETCH_FILM_SUCCESS:
      return {
        ...state,
        currentFilm: {
          ...state.currentFilm,
          isFetchingFilm: false,
        },
        films: {
          ...state.films,
          items: [
            ...state.films.items,
            FilmsHelper.mapJsonToFilm(action.payload.film),
          ],
        },
      };
    case FETCH_FILM_FAILURE:
      const newErrors2 = //TODO Cambiar nombre
        action.payload?.errorMessage != null
          ? [...state.errors, action.payload.errorMessage]
          : [...state.errors];

      return {
        ...state,
        errors: newErrors2,
        currentFilm: {
          ...state.currentFilm,
          isFetchingFilm: false,
        },
      };
    case FETCH_FILM_CHARACTER_REQUEST:
      return {
        ...state,
        characters: [
          ...state.characters,
          { id: action.payload.characterId, isFetching: true },
        ],
      };
    case FETCH_CHARACTER_REQUEST:
      return {
        ...state,
        currentCharacter: {
          id: action.payload.characterId,
          isFetching: true,
        },
      };

    case SKIP_FETCH_CHARACTER:
      return {
        ...state,
        currentCharacter: {
          ...state.currentCharacter,
          isFetching: false,
        },
      };
    case FETCH_FILM_CHARACTER_SUCCESS:
      const newChars = [...state.characters];
      const charIndex = newChars.findIndex(
        (char) => char.id === action.payload.characterId
      );

      newChars[charIndex] = {
        ...newChars[charIndex],
        isFetching: false,
        item: {
          ...action.payload.character,
          id: action.payload.characterId,
          isFavourite: false,
        },
      };

      return {
        ...state,
        characters: newChars,
      };

    case FETCH_CHARACTER_SUCCESS:
      const newChars2 = [...state.characters];
      const charIndex2 = newChars2.findIndex(
        (char) => char.id === action.payload.characterId
      );

      newChars2[charIndex2] = {
        ...newChars2[charIndex2],
        isFetching: false,
        item: {
          ...action.payload.character,
          id: action.payload.characterId,
          isFavourite: false,
        },
      };

      return {
        ...state,
        characters: [
          ...state.characters,
          {
            id: action.payload.characterId,
            isFetching: false,
            item: {
              ...action.payload.character,
              id: action.payload.characterId,
              isFavourite: false,
            },
          },
        ],
        currentCharacter: {
          ...state.currentCharacter,
          isFetching: false,
        },
      };
    case FETCH_FILM_CHARACTER_FAILURE:
      const errorBeforeFailure = [...state.errors];
      if (!state.errors.includes(action.payload.errorMessage)) {
        errorBeforeFailure.push(action.payload.errorMessage);
      }

      const newChars3 = [...state.characters];
      const charIndex3 = newChars3.findIndex(
        (char) => char.id === action.payload.characterId
      );

      newChars3[charIndex3] = {
        ...newChars3[charIndex3],
        isFetching: false,
        item: null,
      };

      return {
        ...state,
        errors: errorBeforeFailure,
        characters: newChars3,
      };
    case FETCH_CHARACTER_FAILURE:
      const errorBeforeFailure2 = [...state.errors];
      if (!state.errors.includes(action.payload.errorMessage)) {
        errorBeforeFailure2.push(action.payload.errorMessage);
      }

      const newChars4 = [...state.characters];
      const charIndex4 = newChars4.findIndex(
        (char) => char.id === action.payload.characterId
      );

      newChars4[charIndex4] = {
        ...newChars4[charIndex4],
        isFetching: false,
        item: null,
      };

      return {
        ...state,
        errors: errorBeforeFailure2,
        characters: newChars4,
        currentCharacter: {
          ...state.currentCharacter,
          isFetching: false,
        },
      };
    case FETCH_FILM_CHARACTERS_SUCCESS:
      return {
        ...state,
        currentFilm: { ...state.currentFilm, isFetchingCharacters: false },
      };

    case "SAVE_FAVOURITE_FILM":
      const newFavs = [...state.films.favourites];
      newFavs.push(action.payload.index);
      return {
        ...state,
        films: {
          ...state.films,
          favourites: newFavs,
        },
      };
    case "REMOVE_FAVOURITE_FILM":
      const newFavourites = [...state.films.favourites];
      const index = newFavourites.indexOf(action.payload.index);
      newFavourites.splice(index, 1);

      return {
        ...state,
        films: {
          ...state.films,
          favourites: newFavourites,
        },
      };
    case "SAVE_FAVOURITE_CHARACTER":
      const updatedCharacter = state.characters[action.payload.index];
      updatedCharacter.isFavourite = true;
      return {
        ...state,
        characters: {
          ...state.characters,
          [action.payload.index]: updatedCharacter,
        },
      };
    case "REMOVE_FAVOURITE_CHARACTER":
      const updatedCharacter2 = state.characters[action.payload.index];
      updatedCharacter2.isFavourite = false;
      return {
        ...state,
        characters: {
          ...state.characters,
          [action.payload.index]: updatedCharacter2,
        },
      };
    case "SELECT_FILM_REQUEST":
      const filmCharacters = state.films.items[action.payload].characters;
      const charactersIds = filmCharacters.map((character) => {
        return character.substring(
          character.indexOf("people/") + 7,
          character.lastIndexOf("/")
        );
      });

      return {
        ...state,
        card: {
          ...state.card,
          selectedFilm: action.payload,
          selectedCharacter: null,
          characters: charactersIds,
          isLoading: true,
        },
      };
    case "SELECT_FILM_SUCCESS":
      return {
        ...state,
        card: {
          ...state.card,
          isLoading: false,
          isFailed: false,
        },
      };
    case "SELECT_CHARACTER":
      return {
        ...state,
        card: {
          ...state.card,
          selectedCharacter: action.payload.index,
        },
      };
    case "UNSELECT_CHARACTER":
      return {
        ...state,
        card: {
          ...state.card,
          selectedCharacter: null,
        },
      };
    case "SELECT_FILM_FAILURE":
      return {
        ...state,
        card: {
          ...state.card,
          isFetching: false,
          isFailed: true,
        },
      };

    default: {
      return state;
    }
  }
}
