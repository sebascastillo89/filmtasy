import React, { useEffect } from "react";
import { connect } from "react-redux";
import { fetchAllFilms } from "../store/actions/index";
import Spinner from "../components/Spinner";
import FilmsBoard from "../components/films/FilmsBoard";

function Favourites({ films, getFilms }) {
  useEffect(() => {
    getFilms();
  });

  if (films.isFetching) {
    return <Spinner />;
  } else {
    return <FilmsBoard onlyFav />;
  }
}

// Redux
const mapStateToProps = (state) => {
  return {
    films: state.films,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getFilms: () => dispatch(fetchAllFilms()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Favourites);
