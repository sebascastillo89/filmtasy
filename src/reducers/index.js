const filmCovers = {
  default:
    "https://upload.wikimedia.org/wikipedia/commons/thumb/c/ce/Star_wars2.svg/1200px-Star_wars2.svg.png",
  1: "https://lumiere-a.akamaihd.net/v1/images/Star-Wars-New-Hope-IV-Poster_c217085b.jpeg?region=40%2C219%2C586%2C293",
  2: "https://lumiere-a.akamaihd.net/v1/images/Star-Wars-Empire-Strikes-Back-V-Poster_878f7fce.jpeg?region=25%2C299%2C612%2C306&width=600",
  3: "https://lumiere-a.akamaihd.net/v1/images/Star-Wars-Return-Jedi-VI-Poster_a10501d2.jpeg?region=9%2C210%2C624%2C312&width=600",
  4: "https://lumiere-a.akamaihd.net/v1/images/Star-Wars-Phantom-Menace-I-Poster_f5832812.jpeg?region=0%2C250%2C678%2C340&width=600",
  5: "https://lumiere-a.akamaihd.net/v1/images/Star-Wars-Attack-Clones-II-Poster_53baa2e7.jpeg?region=0%2C188%2C678%2C340&width=600",
  6: "https://lumiere-a.akamaihd.net/v1/images/Star-Wars-Revenge-Sith-III-Poster_646108ce.jpeg?region=0%2C356%2C746%2C374&width=600",
};

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
      const filmsWithCover = action.payload.films.map((film) => {
        const filmCover = filmCovers[film.episode_id] ?? "uriuri";
        return { ...film, coverImage: filmCover };
      });
      return {
        ...state,
        films: {
          ...state.films,
          isFetching: false,
          items: filmsWithCover,
        },
      };
    case FETCH_FILMS_FAILURE:
      const newErrors =
        action.payload?.errorMessage != null
          ? [...state.errors, action.payload.errorMessage]
          : [...state.errors];
      return {
        ...state,
        errors: newErrors,
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
