import { React, useEffect } from "react";
import { connect } from "react-redux";
import * as FilmsHelper from "../films/FilmsHelper";
import Spinner from "../Spinner";
import { fetchCharacters } from "../../store/actions";
import CharacterLinkedName from "./CharacterLinkedName";

function CharacterList({ currentFilm, film, getCharacters }) {
  useEffect(() => {
    getCharacters(film.id);
  }, [currentFilm]);

  const isCurrentFilm = currentFilm.id === parseInt(film.id);

  if (!isCurrentFilm || currentFilm.isFetchingCharacters) {
    return <Spinner />;
  } else {
    const charactersIds = FilmsHelper.getCharactersIds(film);
    return charactersIds.map((charId, index) => {
      return (
        <CharacterLinkedName
          key={index}
          characterId={charId}
          isLast={index === charactersIds.length - 1}
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
