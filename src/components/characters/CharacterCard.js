import React from "react";
import { connect } from "react-redux";
import { Card } from "react-bootstrap";
import CharBreadcrumb from "./CharBreadcrumb";
import FavStar from "../FavStar";
import { useTranslation } from "react-i18next";

function CharacterCard({ characterId, characters }) {
  const { t } = useTranslation();
  const id = parseInt(characterId);
  const character = !isNaN(id)
    ? characters.find((cobj) => cobj.id === id)
    : null;

  if (!character || !character.item) {
    return null;
  } else {
    return (
      <Card style={{ width: "100%" }}>
        <CharBreadcrumb charName={character.item.name} />
        <Card.Body>
          <Card.Img variant="top" src={character.item.image} />
          <Card.Title>
            {character.item.name} <FavStar id={id} type="character" />
          </Card.Title>
          <Card.Subtitle className="mb-2 text-muted">
            {character.item.gender}
          </Card.Subtitle>
          <Card.Text>
            <b>{t("Height")}</b> {character.item.height}
          </Card.Text>
          <Card.Text>
            <b>{t("Mass")}</b> {character.item.mass}
          </Card.Text>
          <Card.Text>
            <b>{t("HairColor")}</b> {character.item.hair_color}
          </Card.Text>
          <Card.Text>
            <b>{t("SkinColor")}</b> {character.item.skin_color}
          </Card.Text>
          <Card.Text>
            <b>{t("EyeColor")}</b> {character.item.eye_color}
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
