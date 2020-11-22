import React, { useEffect } from "react";
import { connect } from "react-redux";
import { fetchAllFilms } from "../store/actions/index";
import FilmsBoard from "../components/films/FilmsBoard";

function Films({ getFilms }) {
  useEffect(() => {
    getFilms();
  }); // eslint-disable-line

  return <FilmsBoard />;
}

const mapDispatchToProps = (dispatch) => {
  return {
    getFilms: () => dispatch(fetchAllFilms()),
  };
};

export default connect(null, mapDispatchToProps)(Films);
