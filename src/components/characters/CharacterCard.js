import { React, useEffect } from "react";
import { useParams } from "react-router-dom";
import { connect } from "react-redux";
import FavBadge from "../FavBadge";
import { Card, Button } from "react-bootstrap";
import Spinner from "../Spinner";
import {
  saveCharacterAsFavourite,
  removeCharacterFromFavourite,
  fetchCharacter,
} from "../../store/actions";

function CharacterCard({
  currentCharacter,
  characters,
  saveAsFav,
  removeFromFav,
  getCharacter,
}) {
  let { id } = useParams();
  const characterId = parseInt(id);
  useEffect(() => {
    getCharacter(id);
  }, [characters]);

  const onFavouriteClick = (fav) => {
    !fav ? saveAsFav(id) : removeFromFav(id);
  };

  const isCurrentCharacter = currentCharacter.id === parseInt(characterId);

  if (!isCurrentCharacter || currentCharacter.isFetching) {
    return <Spinner />;
  } else {
    const character = characters.find(
      (obj) => obj.id === parseInt(characterId)
    );
    const fav = false;
    return (
      <Card style={{ width: "50%" }}>
        <Card.Body>
          <Card.Title>
            {character.item.name} {fav ? <FavBadge /> : null}
          </Card.Title>
          <Card.Subtitle className="mb-2 text-muted">
            {character.item.gender}
          </Card.Subtitle>
          <Card.Text>
            <b>Height:</b> {character.item.height}
          </Card.Text>
          <Card.Text>
            <b>Mass:</b> {character.item.mass}
          </Card.Text>
          <Card.Text>
            <b>Hair color:</b> {character.item.hair_color}
          </Card.Text>
          <Card.Text>
            <b>Skin color:</b> {character.item.skin_color}
          </Card.Text>
          <Card.Text>
            <b>Eye color:</b> {character.item.eye_color}
          </Card.Text>
          <Button
            variant="primary"
            onClick={() => console.log("TODO link to films")}
          >
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
}

// Redux
const mapStateToProps = (state) => {
  return {
    card: state.card,
    characters: state.characters,
    currentCharacter: state.currentCharacter,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    saveAsFav: (index) => dispatch(saveCharacterAsFavourite(index)),
    removeFromFav: (index) => dispatch(removeCharacterFromFavourite(index)),
    getCharacter: (index) => dispatch(fetchCharacter(index)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CharacterCard);
