import React from "react";
import { connect } from "react-redux";
import { Breadcrumb } from "react-bootstrap";
import { useHistory } from "react-router-dom";

function CharBreadcrumb({ films, charName, selectedFilm }) {
  let history = useHistory();
  if (!selectedFilm || selectedFilm == null) {
    return null;
  } else {
    const film = films.items.find((fobj) => fobj.id === selectedFilm);
    return (
      <Breadcrumb>
        <Breadcrumb.Item href="/">Home</Breadcrumb.Item>
        <Breadcrumb.Item onClick={() => history.goBack()}>
          {film.title}
        </Breadcrumb.Item>
        <Breadcrumb.Item active>{charName}</Breadcrumb.Item>
      </Breadcrumb>
    );
  }
}

// Redux
const mapStateToProps = (state) => {
  return {
    selectedFilm: state.currentFilm.id,
    films: state.films,
  };
};

export default connect(mapStateToProps)(CharBreadcrumb);
