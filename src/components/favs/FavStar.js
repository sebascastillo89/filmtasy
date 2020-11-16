import React, { useState } from "react";
import emptyStar from "../images/emptyStar.svg";
import filledStar from "../images/filledStar.svg";
import * as FavsHelper from "./FavsHelper";

function FavStar({ id, type, readOnly }) {
  //TODO Pending to refactor
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
      return (
        <img
          style={{ verticalAlign: "top" }}
          src={filledStar}
          alt="filledStar"
        />
      );
    } else {
      return (
        <img
          src={filledStar}
          style={{ verticalAlign: "top" }}
          alt="filledStar"
          onClick={(e) => onClickFav(e)}
        />
      );
    }
  } else {
    if (!readOnly) {
      return (
        <img
          src={emptyStar}
          style={{ verticalAlign: "top" }}
          alt="emptyStar"
          onClick={(e) => onClickFav(e)}
        />
      );
    } else {
      return null;
    }
  }
}

export default FavStar;
