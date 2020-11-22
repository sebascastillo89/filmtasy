import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { connect } from "react-redux";
import Spinner from "../components/Spinner";
import CharacterCard from "../components/characters/CharacterCard";
import { fetchCharacter } from "../store/actions/index";
import NotFound from "../components/NotFound";

function CurrentCharacter({ currentCharacter, getCharacter }) {
  let { id } = useParams();
  const characterId = parseInt(id);

  useEffect(() => {
    getCharacter(characterId);
  }, []); // eslint-disable-line

  if (currentCharacter.id !== characterId || currentCharacter.isFetching) {
    return <Spinner />;
  } else if (currentCharacter.isFailure) {
    return <NotFound />;
  } else {
    return <CharacterCard characterId={characterId} />;
  }
}

// Redux
const mapStateToProps = (state) => {
  return {
    currentCharacter: state.currentCharacter,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getCharacter: (index) => dispatch(fetchCharacter(index)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CurrentCharacter);
