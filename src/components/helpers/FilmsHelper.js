import * as CharacterHelper from "./CharacterHelper";

export function getIdFromUrl(filmUrl) {
  const filmPrefixIndex = filmUrl?.indexOf("films/") ?? -1;
  const filmSuffixIndex = filmUrl?.lastIndexOf("/") ?? -1;

  if (filmPrefixIndex >= 0 && filmSuffixIndex) {
    const filmId = filmUrl.substring(filmPrefixIndex + 6, filmSuffixIndex);
    if (!Number.isInteger(filmId)) {
      return parseInt(filmId);
    }
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
  const defaultCover =
    "https://upload.wikimedia.org/wikipedia/commons/thumb/c/ce/Star_wars2.svg/1200px-Star_wars2.svg.png";
  const filmCovers = {
    4: "https://lumiere-a.akamaihd.net/v1/images/Star-Wars-New-Hope-IV-Poster_c217085b.jpeg?region=40%2C219%2C586%2C293",
    5: "https://lumiere-a.akamaihd.net/v1/images/Star-Wars-Empire-Strikes-Back-V-Poster_878f7fce.jpeg?region=25%2C299%2C612%2C306&width=600",
    6: "https://lumiere-a.akamaihd.net/v1/images/Star-Wars-Return-Jedi-VI-Poster_a10501d2.jpeg?region=9%2C210%2C624%2C312&width=600",
    1: "https://lumiere-a.akamaihd.net/v1/images/Star-Wars-Phantom-Menace-I-Poster_f5832812.jpeg?region=0%2C250%2C678%2C340&width=600",
    2: "https://lumiere-a.akamaihd.net/v1/images/Star-Wars-Attack-Clones-II-Poster_53baa2e7.jpeg?region=0%2C188%2C678%2C340&width=600",
    3: "https://lumiere-a.akamaihd.net/v1/images/Star-Wars-Revenge-Sith-III-Poster_646108ce.jpeg?region=0%2C356%2C746%2C374&width=600",
  };
  return filmCovers[episodeId] ?? defaultCover;
}