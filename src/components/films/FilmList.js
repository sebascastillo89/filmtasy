import React from "react";
import { connect } from "react-redux";
import FilmRow from "./FilmRow";
import { ListGroup, Spinner } from "react-bootstrap";

function FilmList({ films }) {
  if (films.isFailed) {
    return null;
  } else if (films.isFetching || !films.items) {
    return (
      <Spinner animation="border" role="status">
        <span className="sr-only">Loading...</span>
      </Spinner>
    );
  } else {
    const listGroups = films.items.map((film, filmIndex) => {
      const filmTitle =
        "(" + film.release_date.substring(0, 4) + ") " + film.title;
      return <FilmRow key={filmIndex} index={filmIndex} title={filmTitle} />;
    });

    return (
      <div>
        <p>There are {films.items.length} films:</p>
        <ListGroup style={{ width: "30%" }} defaultActiveKey="#link1">
          {listGroups}
        </ListGroup>
      </div>
    );
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
