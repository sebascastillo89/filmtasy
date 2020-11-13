const FAVS_FILMS = "filmtasy_favs_films";
const FAVS_CHARS = "filmtasy_favs_characters";

function getArrayFromStorage(itemId) {
  const item = localStorage.getItem(itemId);
  console.log("storage contains " + item);
  return item != null ? JSON.parse(item) : [];
}
export function isFavCharacter(id) {
  console.log("isFavCharacter: " + id);
  const favs = getArrayFromStorage(FAVS_CHARS);
  console.log("current favs: " + favs.length + ": " + favs);
  return favs != null && favs.includes(id);
}

export function isFavFilm(id) {
  const favs = getArrayFromStorage(FAVS_FILMS);
  return favs != null && favs.includes(id);
}

export function setFavCharacter(id, isFav) {
  console.log("setFavCharacter: " + id + isFav);
  const favs = getArrayFromStorage(FAVS_CHARS);
  console.log("current favs: " + favs);
  let newFavs = [...favs];
  if (isFav) {
    console.log("isFav! before:" + newFavs);
    newFavs = [...favs, id];
    console.log("isFav! after:" + newFavs);
  } else {
    newFavs.splice(favs.indexOf(id), 1);
  }
  console.log("new favs: " + newFavs);
  localStorage.setItem(FAVS_CHARS, JSON.stringify(newFavs));
}

export function setFavFilm(id, isFav) {
  const favs = getArrayFromStorage(FAVS_FILMS);
  let newFavs = [...favs];
  if (isFav) {
    newFavs = [...favs, id];
  } else {
    newFavs.splice(favs.indexOf(id), 1);
  }
  localStorage.setItem(FAVS_FILMS, JSON.stringify(newFavs));
}
