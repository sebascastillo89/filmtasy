import { React, useState } from "react";
import emptyStar from "./emptyStar.svg";
import filledStar from "./filledStar.svg";
import * as FavsHelper from "./FavsHelper";

function FavStar({ id, type, readOnly }) {
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
    if (readOnly) {
      return <img src={filledStar} alt="filledStar" />;
    } else {
      return (
        <img src={filledStar} alt="filledStar" onClick={(e) => onClickFav(e)} />
      );
    }
  } else {
    if (!readOnly) {
      return (
        <img src={emptyStar} alt="emptyStar" onClick={(e) => onClickFav(e)} />
      );
    } else {
      return null;
    }
  }
}

export default FavStar;
