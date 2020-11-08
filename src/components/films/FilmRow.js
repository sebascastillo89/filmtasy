import React from "react";
import { connect } from "react-redux";
import { ListGroup } from "react-bootstrap";
import FavBadge from "../FavBadge";
import { selectFilm } from "../../actions/index";

function FilmRow({ index, films, selectFilm }) {
  const film = films.items[index];
  const releaseYear = new Date(film.release_date).getFullYear();
  const rowTitle = `(${releaseYear}) ${film.title} `;
  const isFav = films.favourites.includes(index);
  return (
    <ListGroup.Item
      action
      href={"#film" + index}
      key={index}
      onClick={(e) => selectFilm(index)}
    >
      {rowTitle}
      {isFav ? <FavBadge /> : null}
    </ListGroup.Item>
  );
}

// Redux
const mapStateToProps = (state) => {
  return {
    films: state.films,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    selectFilm: (filmIndex) => dispatch(selectFilm(filmIndex)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(FilmRow);
