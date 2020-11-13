import { React, useState } from "react";
import emptyStar from "./emptyStar.svg";
import filledStar from "./filledStar.svg";
import * as FavsHelper from "./FavsHelper";

function FavStar({ id, type }) {
  const isFilm = type === "film";
  const [fav, setFav] = useState(
    isFilm ? FavsHelper.isFavFilm(id) : FavsHelper.isFavCharacter(id)
  );

  function onClickFav(e) {
    e.preventDefault();
    isFilm
      ? FavsHelper.setFavFilm(id, !fav)
      : FavsHelper.setFavCharacter(id, !fav);
    setFav(!fav);
  }

  if (fav) {
    return (
      <img src={filledStar} alt="filledStar" onClick={(e) => onClickFav(e)} />
    );
  } else {
    return (
      <img src={emptyStar} alt="emptyStar" onClick={(e) => onClickFav(e)} />
    );
  }
}

export default FavStar;
