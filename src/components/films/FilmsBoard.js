import React from "react";
import { connect } from "react-redux";
import FilmSmallCard from "./FilmSmallCard";
import { CardDeck } from "react-bootstrap";
import * as FilmsHelper from "./FilmsHelper";

function FilmsBoard({ films }) {
  if (!films.items || films.items.length === 0) {
    return <h3>There are no films</h3>;
  } else {
    const filmSmallCards = films.items.map((film) => {
      return (
        <FilmSmallCard
          key={film.title}
          title={film.title}
          subtitle={FilmsHelper.getSubtitle(film)}
          src={film.coverImage}
          id={film.id}
        ></FilmSmallCard>
      );
    });
    return (
      <div>
        <p>Click in a film to retrieve more information:</p>
        <CardDeck>{filmSmallCards}</CardDeck>
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

export default connect(mapStateToProps)(FilmsBoard);
