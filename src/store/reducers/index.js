import { combineReducers } from "redux";
import characters from "./characters";
import films from "./films";
import currentFilm from "./currentFilm";
import currentCharacter from "./currentCharacter";
import errors from "./errors";

export default combineReducers({
  characters,
  films,
  currentFilm,
  currentCharacter,
  errors,
});
