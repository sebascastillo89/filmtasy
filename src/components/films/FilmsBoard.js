import { React, useEffect } from "react";
import { connect } from "react-redux";
import { fetchAllFilms } from "../../store/actions";
import Spinner from "../Spinner";
import FilmSmallCard from "./FilmSmallCard";
import { CardDeck } from "react-bootstrap";
import * as FilmsHelper from "./FilmsHelper";

function FilmsBoard({ films, getFilms }) {
  useEffect(() => {
    getFilms();
  }, [films.items]);

  const filmBoard = () => {
    if (films.isFetching) {
      return <Spinner />;
    } else if (!films.items) {
      return null; //TODO Bast ¿que pintamos?
    } else {
      const cards = films.items.map((film) => {
        const year = new Date(film.release_date).getFullYear();
        return (
          <FilmSmallCard
            key={film.title}
            title={film.title}
            subtitle={FilmsHelper.getSubtitle(film)}
            src={film.coverImage}
            id={FilmsHelper.getIdFromUrl(film.url)}
          ></FilmSmallCard>
        );
      });
      return <CardDeck>{cards}</CardDeck>;
    }
  };

  return (
    <div>
      <p>Click in a film to retrieve more information:</p>
      {filmBoard()}
    </div>
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
    getFilms: () => dispatch(fetchAllFilms()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(FilmsBoard);
