import * as CharacterHelper from "./CharacterHelper";
import filmCovers from "./filmCovers.json";

export function getIdFromUrl(filmUrl) {
  const filmPrefixIndex = filmUrl?.indexOf("films/") ?? -1;
  const filmSuffixIndex = filmUrl?.lastIndexOf("/") ?? -1;

  if (filmPrefixIndex >= 0 && filmSuffixIndex) {
    const filmId = filmUrl.substring(filmPrefixIndex + 6, filmSuffixIndex);
    const filmInt = parseInt(filmId);

    return isNaN(filmInt) ? null : filmInt;
  }
  return null;
}

export function mapJsonToFilms(response) {
  if (!response) return [];
  return response.map((film) => {
    return mapJsonToFilm(film);
  });
}

export function mapJsonToFilm(film) {
  // TODO Si no puede sacar id o characters añadir error y retornar nulo
  const filmId = getIdFromUrl(film?.url);

  if (!film || !filmId) {
    return null;
  } else {
    return {
      id: filmId,
      title: film.title,
      episode_id: film.episode_id,
      opening_crawl: film.opening_crawl,
      director: film.director,
      producer: film.producer,
      release_date: film.release_date,
      coverImage: getCoverImage(film.episode_id),
      characters: film.characters?.map((characterUrl) => {
        return CharacterHelper.getIdFromUrl(characterUrl);
      }),
    };
  }
}

export function getSubtitle(film) {
  let subtitle = "";
  if (film?.episode_id != null) subtitle += "Episode " + film.episode_id;
  if (film?.release_date != null)
    subtitle += " - " + new Date(film.release_date).getFullYear();

  return subtitle;
}

export function setFetchingByFilmId(items, filmId, newValue) {
  if (!items || !Number.isInteger(filmId)) {
    return items;
  } else {
    const index = items.findIndex((obj) => obj.id === parseInt(filmId));

    const newItems = [...items];
    newItems[index] = {
      ...newItems[index],
      isFetching: newValue,
    };

    return newItems;
  }
}

export function setFetchingCharactersByFilmId(items, filmId, newValue) {
  if (!items || !Number.isInteger(filmId)) {
    return items;
  } else {
    const index = items.findIndex((obj) => obj.id === parseInt(filmId));

    const newItems = [...items];
    newItems[index] = {
      ...newItems[index],
      isFetchingCharacters: newValue,
    };

    return newItems;
  }
}

export function getCoverImage(episodeId) {
  return filmCovers[episodeId.toString()] ?? filmCovers["default"];
}
