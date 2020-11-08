import React from "react";
import FavBadge from "../FavBadge";
import { connect } from "react-redux";
import { ListGroup } from "react-bootstrap";
import { selectFilm } from "../../actions/index";

function FilmRow({ index, title, selectFilm, films }) {
  const fav = films.favourites.includes(index);
  return (
    <ListGroup.Item
      action
      href={"#film" + index}
      key={index}
      onClick={(e) => selectFilm(index)}
    >
      {title}
      {fav ? <FavBadge /> : null}
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
