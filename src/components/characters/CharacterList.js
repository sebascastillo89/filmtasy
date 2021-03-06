import React, { useEffect } from "react";
import { connect } from "react-redux";
import Spinner from "../Spinner";
import { fetchCharacter } from "../../store/actions/index";
import CharacterLinkedName from "./CharacterLinkedName";

function CharacterList({ currentFilm, film, getCharacter }) {
  useEffect(() => {
    film.characters?.forEach((characterId) => {
      getCharacter(characterId);
    });
  }, []); // eslint-disable-line

  const isCurrentFilm = currentFilm.id === parseInt(film.id);
  if (!isCurrentFilm || currentFilm.isFetchingCharacters) {
    return <Spinner />;
  } else if (!film.characters) {
    return null;
  } else {
    return film.characters.map((charId, index) => {
      return (
        <CharacterLinkedName
          key={index}
          characterId={charId}
          isLast={index === film.characters.length - 1}
        />
      );
    });
  }
}

// Redux
const mapStateToProps = (state) => {
  return {
    currentFilm: state.currentFilm,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getCharacter: (characterId) => dispatch(fetchCharacter(characterId)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CharacterList);
