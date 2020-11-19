import React, { useState } from "react";
import emptyStar from "./images/emptyStar.svg";
import filledStar from "./images/filledStar.svg";
import * as FavsHelper from "./helpers/FavsHelper";

function FavStar({ id, type, readOnly }) {
  const filmId = parseInt(id); //TODO PARSE
  const isFilm = type === "film";
  const [fav, setFav] = useState(
    isFilm ? FavsHelper.isFavFilm(filmId) : FavsHelper.isFavCharacter(filmId)
  );

  function onClickFav(e) {
    e.preventDefault();
    if (!readOnly) {
      isFilm
        ? FavsHelper.setFavFilm(filmId, !fav)
        : FavsHelper.setFavCharacter(filmId, !fav);
      setFav(!fav);
    }
  }

  if (readOnly && !fav) {
    return null;
  } else {
    return (
      <img
        style={{ verticalAlign: "top" }}
        src={fav ? filledStar : emptyStar}
        alt={fav ? "filledStar" : "emptyStar"}
        onClick={(e) => onClickFav(e)}
      />
    );
  }
}

export default FavStar;
