import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import FavBadge from "../FavBadge";

function CharacterLinkedName({ characters, characterId, isLast }) {
  const character = characters.find((obj) => obj.id === parseInt(characterId));
  if (!character || !character.item) {
    return null;
  } else {
    const link = "/characters/" + characterId;
    return (
      <>
        <Link to={link}>
          {character.item.name}
          {character.isFavourite ? <FavBadge /> : null}
          {isLast ? "." : ", "}
        </Link>
      </>
    );
  }
}

// Redux
const mapStateToProps = (state) => {
  return {
    characters: state.characters,
  };
};

export default connect(mapStateToProps)(CharacterLinkedName);
