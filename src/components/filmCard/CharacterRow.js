import React from "react";
import { connect } from "react-redux";
import { Card, Badge } from "react-bootstrap";

function CharacterRow({ characters, card, characterId }) {
  if (!characters[characterId]) {
    return null;
  } else {
    return (
      <li>
        <Card.Link onClick={() => alert("sebas")}>
          {characters[characterId].item.name}
        </Card.Link>
        <Badge pill variant="warning">
          Favourite
        </Badge>
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
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(CharacterRow);
