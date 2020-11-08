const initialState = {
  errors: [],
  films: {
    isFetching: false,
    favourites: [],
    items: null,
  },
  card: {
    selectedFilm: null,
    selectedCharacter: null,
    isLoading: false,
    characters: [],
  },
  characters: [],
};

export default function reducer(state = initialState, action) {
  const RESET_ERROR = "RESET_ERROR";
  const FETCH_FILMS_REQUEST = "FETCH_FILMS_REQUEST";
  const FETCH_FILMS_SUCCESS = "FETCH_FILMS_SUCCESS";
  const FETCH_FILMS_FAILURE = "FETCH_FILMS_FAILURE";
  const SKIP_FETCH_CHARACTER = "SKIP_FETCH_CHARACTER";
  const FETCH_CHARACTER_REQUEST = "FETCH_CHARACTER_REQUEST";
  const FETCH_CHARACTER_SUCCESS = "FETCH_CHARACTER_SUCCESS";
  const FETCH_CHARACTER_FAILURE = "FETCH_CHARACTER_FAILURE";

  switch (action.type) {
    case RESET_ERROR:
      const newErrorList = [...state.errors];
      newErrorList.splice(action.payload.errorIndex, 1);
      return {
        ...state,
        errors: newErrorList,
      };
    case FETCH_FILMS_REQUEST:
      return {
        ...state,
        films: {
          ...state.films,
          isFetching: true,
        },
      };
    case FETCH_FILMS_SUCCESS:
      return {
        ...state,
        films: {
          ...state.films,
          isFetching: false,
          items: action.payload.films,
        },
      };
    case FETCH_FILMS_FAILURE:
      return {
        ...state,
        errors: [...state.errors, action.payload.errorMessage],
        films: {
          ...state.films,
          isFetching: false,
          items: null,
        },
      };
    case SKIP_FETCH_CHARACTER:
      const newCharList = state.card.characters;
      newCharList.splice(state.card.characters.indexOf(action.payload), 1);
      return {
        ...state,
        card: {
          ...state.card,
          characters: newCharList,
          isLoading: newCharList.length > 0,
        },
      };
    case FETCH_CHARACTER_REQUEST:
      return {
        ...state,
        characters: {
          ...state.characters,
          [action.payload]: {
            isFetching: true,
          },
        },
      };
    case FETCH_CHARACTER_SUCCESS:
      const charsBeforeFetch = state.card.characters;
      charsBeforeFetch.splice(
        charsBeforeFetch.indexOf(action.payload.characterId),
        1
      );
      return {
        ...state,
        card: {
          ...state.card,
          characters: charsBeforeFetch,
          isLoading: charsBeforeFetch.length > 0,
        },
        characters: {
          ...state.characters,
          [action.payload.characterId]: {
            isFetching: false,
            isFailed: false,
            item: action.payload.character,
          },
        },
      };
    case FETCH_CHARACTER_FAILURE:
      const charsBeforeFailure = state.card.characters;
      charsBeforeFailure.splice(
        charsBeforeFailure.indexOf(action.payload.characterId),
        1
      );

      const errorBeforeFailure = [...state.errors];
      if (!state.errors.includes(action.payload.errorMessage)) {
        errorBeforeFailure.push(action.payload.errorMessage);
      }

      return {
        ...state,
        errors: errorBeforeFailure,
        card: {
          ...state.card,
          characters: charsBeforeFailure,
          isLoading: charsBeforeFailure.length > 0,
        },
        characters: {
          ...state.characters,
          [action.payload.characterId]: {
            isFetching: false,
            isFailed: true,
          },
        },
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
