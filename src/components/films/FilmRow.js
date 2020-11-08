import React from "react";
import { connect } from "react-redux";
import { ListGroup } from "react-bootstrap";
import { selectFilm } from "../../actions/index";

function FilmRow({ index, title, selectFilm, films }) {
  return (
    <ListGroup.Item
      action
      href={"#film" + index}
      key={index}
      onClick={(e) => selectFilm(index)}
    >
      {title}
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
