import React from "react";
import { connect } from "react-redux";
import FavBadge from "../FavBadge";
import { Card } from "react-bootstrap";
import { selectCharacter } from "../../actions/index";

function CharacterRow({ characters, characterId, selectCharacter }) {
  if (!characters[characterId] || !characters[characterId].item) {
    return null;
  } else {
    return (
      <li>
        <Card.Link onClick={() => selectCharacter(characterId)}>
          {characters[characterId].item.name}{" "}
          {characters[characterId].isFavourite ? <FavBadge /> : null}
        </Card.Link>
      </li>
    );
  }
}

// Redux
const mapStateToProps = (state) => {
  return {
    card: state.card,
    characters: state.characters,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    selectCharacter: (index) => dispatch(selectCharacter(index)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CharacterRow);
