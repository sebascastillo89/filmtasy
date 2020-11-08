import React from "react";
import { connect } from "react-redux";
import CharacterRow from "./CharacterRow";
import { Spinner } from "react-bootstrap";

function CharacterList({ card, films }) {
  console.log("CharacterList");

  if (card.isFetching) {
    return (
      <Spinner animation="border" role="status">
        <span className="sr-only">Loading...</span>
      </Spinner>
    );
  } else {
    const characterIds = films.items[card.selectedFilm].characters.map(
      (character) => {
        return character.substring(
          character.indexOf("people/") + 7,
          character.lastIndexOf("/")
        );
      }
    );
    return (
      <ul>
        {characterIds.map((charId, index) => {
          return <CharacterRow key={index} characterId={charId} />;
        })}
      </ul>
    );
  }
}

// Redux
const mapStateToProps = (state) => {
  return {
    card: state.card,
    films: state.films,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(CharacterList);
