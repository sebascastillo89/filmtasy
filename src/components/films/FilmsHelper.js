import * as CharacterHelper from "../characters/CharacterHelper";

export function mapJsonToFilms(response) {
  return response.map((film) => {
    return {
      id: this.getIdFromUrl(film.url),
      ...film,
      coverImage: this.getCoverImage(film.episode_id),
    };
  });
}

export function mapJsonToFilm(response) {
  return {
    id: this.getIdFromUrl(response.url),
    ...response,
    coverImage: this.getCoverImage(response.episode_id),
  };
}

export function getCharactersIds(film) {
  const characters = film.characters.map((character) => {
    return CharacterHelper.getIdFromUrl(character);
  });
  return characters;
}

export function getIdFromUrl(filmUrl) {
  return parseInt(
    filmUrl.substring(filmUrl.indexOf("films/") + 6, filmUrl.lastIndexOf("/")) //TODO validar parse int
  );
}

export function getSubtitle(film) {
  const year = new Date(film.release_date).getFullYear();
  return `Episode ${film.episode_id} - ${year}`;
}

export function setFetchingByFilmId(items, filmId, newValue) {
  const index = items.findIndex((obj) => obj.id === parseInt(filmId)); //TODO Si no existe o si falla parseInt

  const newItems = [...items];
  newItems[index] = {
    ...newItems[index],
    isFetching: newValue,
  };

  return newItems;
}

export function setFetchingCharactersByFilmId(items, filmId, newValue) {
  //TODO separar el getIndex del insert
  const index = items.findIndex((obj) => obj.id === parseInt(filmId)); //TODO Si no existe o si falla parseInt

  const newItems = [...items];
  newItems[index] = {
    ...newItems[index],
    isFetchingCharacters: newValue,
  };

  return newItems;
}

export function getCoverImage(episodeId) {
  const defaultCover =
    "https://upload.wikimedia.org/wikipedia/commons/thumb/c/ce/Star_wars2.svg/1200px-Star_wars2.svg.png";
  const filmCovers = {
    1: "https://lumiere-a.akamaihd.net/v1/images/Star-Wars-New-Hope-IV-Poster_c217085b.jpeg?region=40%2C219%2C586%2C293",
    2: "https://lumiere-a.akamaihd.net/v1/images/Star-Wars-Empire-Strikes-Back-V-Poster_878f7fce.jpeg?region=25%2C299%2C612%2C306&width=600",
    3: "https://lumiere-a.akamaihd.net/v1/images/Star-Wars-Return-Jedi-VI-Poster_a10501d2.jpeg?region=9%2C210%2C624%2C312&width=600",
    4: "https://lumiere-a.akamaihd.net/v1/images/Star-Wars-Phantom-Menace-I-Poster_f5832812.jpeg?region=0%2C250%2C678%2C340&width=600",
    5: "https://lumiere-a.akamaihd.net/v1/images/Star-Wars-Attack-Clones-II-Poster_53baa2e7.jpeg?region=0%2C188%2C678%2C340&width=600",
    6: "https://lumiere-a.akamaihd.net/v1/images/Star-Wars-Revenge-Sith-III-Poster_646108ce.jpeg?region=0%2C356%2C746%2C374&width=600",
  };
  return filmCovers[episodeId] ?? defaultCover;
}
