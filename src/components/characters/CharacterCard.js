import React from "react";
import { connect } from "react-redux";
import FavBadge from "../FavBadge";
import { Card, Button } from "react-bootstrap";
import NotFound from "../NotFound";

function CharacterCard({ characterId, characters }) {
  const character = characters.find((cobj) => cobj.id === characterId);

  if (!character || !character.item) {
    return <NotFound />;
  } else {
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
            onClick={() => console.log("FAV CHAR")}
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
    characters: state.characters,
  };
};

export default connect(mapStateToProps)(CharacterCard);
