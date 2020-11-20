import React from "react";
import { connect } from "react-redux";
import { Breadcrumb } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";

function CharBreadcrumb({ films, charName, selectedFilm }) {
  if (!selectedFilm || selectedFilm == null) {
    return null;
  } else {
    const film = films.items.find((fobj) => fobj.id === selectedFilm);
    return (
      <Breadcrumb>
        <LinkContainer to="/">
          <Breadcrumb.Item>Home</Breadcrumb.Item>
        </LinkContainer>
        <LinkContainer to={"/films/" + selectedFilm}>
          <Breadcrumb.Item>{film.title}</Breadcrumb.Item>
        </LinkContainer>
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
