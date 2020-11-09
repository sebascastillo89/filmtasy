import React from "react";
import { connect } from "react-redux";
import Spinner from "../Spinner";
import FilmCard from "./FilmCard";
import { CardDeck } from "react-bootstrap";

function FilmsCardContainer({ films }) {
  if (films.isFetching) {
    return <Spinner />;
  } else if (!films.items) {
    return null;
  } else {
    console.log("FilmsCarousel dentro");
    const cards = films.items.map((film) => {
      return (
        <FilmCard
          title={film.title}
          subtitle={"Episode " + film.episode_id}
          src={film.coverImage}
        ></FilmCard>
      );
    });

    return <CardDeck>{cards}</CardDeck>;
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

export default connect(mapStateToProps, mapDispatchToProps)(FilmsCardContainer);
