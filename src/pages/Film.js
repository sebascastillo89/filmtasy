import { React, useEffect } from "react";
import { useParams } from "react-router-dom";
import { connect } from "react-redux";
import Spinner from "../components/Spinner";
import FilmCard from "../components/films/FilmCard";
import { fetchFilm } from "../store/actions";

function Film({ currentFilm, getFilm }) {
  let { id } = useParams();
  const filmId = parseInt(id);

  useEffect(() => {
    getFilm(filmId);
  }, []);

  const isCurrentFilm = currentFilm.id === filmId;
  if (!isCurrentFilm || currentFilm.isFetching) {
    return <Spinner />;
  } else {
    return <FilmCard filmId={filmId} />;
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
    getFilm: (index) => dispatch(fetchFilm(index)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Film);