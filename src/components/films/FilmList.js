import React from "react";
import { connect } from "react-redux";
import FilmRow from "./FilmRow";
import Spinner from "../Spinner";

function FilmList({ films }) {
  if (films.isFetching) {
    return <Spinner />;
  } else if (!films.items) {
    return null;
  } else {
    return films.items.map((film, filmIndex) => {
      return <FilmRow key={filmIndex} index={filmIndex} />;
    });
  }
}

// Redux
const mapStateToProps = (state) => {
  return {
    films: state.films,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(FilmList);
