import React from "react";
import { connect } from "react-redux";
import FavBadge from "../FavBadge";
import { Card, Button } from "react-bootstrap";
import {
  saveCharacterAsFavourite,
  removeCharacterFromFavourite,
  unselectCharacter,
} from "../../actions/index";

function CharacterData({
  characters,
  card,
  saveAsFav,
  removeFromFav,
  unselectChar,
}) {
  const onFavouriteClick = (fav) => {
    !fav
      ? saveAsFav(card.selectedCharacter)
      : removeFromFav(card.selectedCharacter);
  };

  const character = characters[card.selectedCharacter].item;
  const fav = characters[card.selectedCharacter].isFavourite ?? false;
  return (
    <Card style={{ width: "50%" }}>
      <Card.Body>
        <Card.Title>
          {character.name} {fav ? <FavBadge /> : null}
        </Card.Title>
        <Card.Subtitle className="mb-2 text-muted">
          {character.gender}
        </Card.Subtitle>
        <Card.Text>
          <b>Height:</b> {character.height}
        </Card.Text>
        <Card.Text>
          <b>Mass:</b> {character.mass}
        </Card.Text>
        <Card.Text>
          <b>Hair color:</b> {character.hair_color}
        </Card.Text>
        <Card.Text>
          <b>Skin color:</b> {character.skin_color}
        </Card.Text>
        <Card.Text>
          <b>Eye color:</b> {character.eye_color}
        </Card.Text>
        <Button variant="primary" onClick={() => unselectChar()}>
          Return to film
        </Button>
        <Button
          variant={fav ? "dark" : "warning"}
          onClick={() => onFavouriteClick(fav)}
        >
          {fav ? "Remove from favourites" : "Add to favourites"}
        </Button>
      </Card.Body>
    </Card>
  );
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
    saveAsFav: (index) => dispatch(saveCharacterAsFavourite(index)),
    removeFromFav: (index) => dispatch(removeCharacterFromFavourite(index)),
    unselectChar: (index) => dispatch(unselectCharacter(index)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CharacterData);
