import React from "react";
import { connect } from "react-redux";
import FilmSmallCard from "./FilmSmallCard";
import { CardDeck } from "react-bootstrap";
import Spinner from "../Spinner";
import * as FilmsHelper from "../helpers/FilmsHelper";
import * as FavsHelper from "../helpers/FavsHelper";
import { useTranslation } from "react-i18next";

function FilmsBoard({ onlyFav, films }) {
  const { t } = useTranslation();
  const { items } = films;

  if (films.isFetching) {
    return <Spinner />;
  } else if (!items || items.length === 0) {
    return null;
  } else {
    const filmSmallCards = films.items.map((film) => {
      if (!onlyFav || (onlyFav && FavsHelper.isFavFilm(film.id))) {
        return (
          <FilmSmallCard
            key={film.title}
            title={film.title}
            subtitle={FilmsHelper.getSubtitle(film)}
            src={film.coverImage}
            id={film.id}
          ></FilmSmallCard>
        );
      } else {
        return null;
      }
    });
    return (
      <>
        <p>{t("FilmBoardDesc")}</p>
        <center>
          <CardDeck style={{ justifyContent: "center" }}>
            {filmSmallCards}
          </CardDeck>
        </center>
      </>
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
