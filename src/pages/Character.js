import { React, useEffect } from "react";
import { useParams } from "react-router-dom";
import { connect } from "react-redux";
import Spinner from "../components/Spinner";
import CharacterCard from "../components/characters/CharacterCard";
import { fetchCharacter } from "../store/actions";

function Character({ currentCharacter, getCharacter }) {
  let { id } = useParams();
  const characterId = parseInt(id);

  useEffect(() => {
    getCharacter(characterId);
  }, []);

  const isCurrentCharacter = currentCharacter.id === characterId;
  if (!isCurrentCharacter || currentCharacter.isFetching) {
    return <Spinner />;
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

export default connect(mapStateToProps, mapDispatchToProps)(Character);
