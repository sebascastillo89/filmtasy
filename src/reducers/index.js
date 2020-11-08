const initialState = {
  errors: [],
  films: {
    isFetching: false,
    isFailed: false,
    favourites: [],
    items: null,
  },
  card: {
    selectedFilm: null,
    isLoading: false,
    isFailed: false,
    characters: [],
  },
  characters: [],
};

export default function reducer(state = initialState, action) {
  const RESET_ERROR = "RESET_ERROR";

  switch (action.type) {
    case RESET_ERROR:
      const newErrorList = [...state.errors];
      newErrorList.splice(action.payload.errorIndex, 1);
      return {
        ...state,
        errors: newErrorList,
      };
    case "FETCH_FILMS_REQUEST":
      return {
        ...state,
        films: {
          ...state.films,
          isFetching: true,
          isFailed: false,
        },
      };
    case "FETCH_FILMS_SUCCESS":
      return {
        ...state,
        films: {
          ...state.films,
          isFetching: false,
          isFailed: false,
          items: action.payload.films,
        },
      };
    case "FETCH_FILMS_FAILURE":
      return {
        ...state,
        errors: [...state.errors, action.payload.errorMessage],
        films: {
          ...state.films,
          isFetching: false,
          isFailed: true,
          items: [],
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
      newFavourites.splice(newFavourites.indexOf(action.payload.index, 1));
      return {
        ...state,
        films: {
          ...state.films,
          favourites: newFavourites,
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
    case "SELECT_FILM_FAILURE":
      return {
        ...state,
        card: {
          ...state.card,
          isFetching: false,
          isFailed: true,
        },
      };
    case "FETCH_CHARACTER_REQUEST":
      return {
        ...state,
        characters: {
          ...state.characters,
          [action.payload]: {
            isFetching: true,
            isFailed: false,
          },
        },
      };
    case "FETCH_CHARACTER_SKIPPED":
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
    case "FETCH_CHARACTER_SUCCESS":
      const newCharList1 = state.card.characters;
      newCharList1.splice(
        state.card.characters.indexOf(action.payload.characterId),
        1
      );
      return {
        ...state,
        card: {
          ...state.card,
          characters: newCharList1,
          isLoading: newCharList1.length > 0,
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
    case "FETCH_CHARACTER_FAILURE":
      return {
        ...state,
        characters: {
          ...state.characters,
          [action.payload.characterId]: {
            isFetching: false,
            isFailed: true,
          },
        },
      };
    default: {
      return state;
    }
  }
}
