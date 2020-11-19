import React from "react";
import { connect } from "react-redux";
import FavStar from "../FavStar";

function CharacterLinkedName({ characters, characterId, isLast }) {
  const character = characters.find((obj) => obj.id === parseInt(characterId));
  if (!character || !character.item?.name) {
    return null;
  } else {
    const link = "/characters/" + characterId;
    return (
      <a href={link}>
        {character.item.name}
        <FavStar id={characterId} type="character" readOnly />
        {isLast ? "." : ", "}
      </a>
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
