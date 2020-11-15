import React, { useEffect } from "react";
import { connect } from "react-redux";
import Spinner from "../Spinner";
import { fetchCharacters } from "../../store/actions/index";
import CharacterLinkedName from "./CharacterLinkedName";

function CharacterList({ currentFilm, film, getCharacters }) {
  useEffect(() => {
    getCharacters(film.id);
  }, [currentFilm]);

  const isCurrentFilm = currentFilm.id === parseInt(film.id);

  if (!isCurrentFilm || currentFilm.isFetchingCharacters) {
    return <Spinner />;
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
    getCharacters: (filmId) => dispatch(fetchCharacters(filmId)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CharacterList);
