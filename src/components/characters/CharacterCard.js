import React from "react";
import { connect } from "react-redux";
import { Card } from "react-bootstrap";
import NotFound from "../NotFound";
import CharBreadcrumb from "./CharBreadcrumb";
import FavStar from "../favs/FavStar";

function CharacterCard({ characterId, characters }) {
  const character = characters.find((cobj) => cobj.id === characterId);

  if (!character || !character.item) {
    return <NotFound />;
  } else {
    return (
      <Card style={{ width: "50%" }}>
        <CharBreadcrumb charName={character.item.name} />
        <Card.Body>
          <Card.Title>
            <FavStar id={characterId} type="character" />
          </Card.Title>
          <Card.Title>{character.item.name}</Card.Title>
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
