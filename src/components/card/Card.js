import React from "react";
import { connect } from "react-redux";
import FilmData from "./FilmData";
import CharacterData from "./CharacterData";

function Card({ card }) {
  if (card.selectedFilm === null && card.selectedCharacter === null) {
    return null;
  } else if (card.selectedCharacter != null) {
    return <CharacterData />;
  } else {
    return <FilmData />;
  }
}

// Redux
const mapStateToProps = (state) => {
  return {
    card: state.card,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(Card);
