import React from "react";
import { connect } from "react-redux";
import { Card } from "react-bootstrap";
import CharacterList from "../characters/CharacterList";
import * as FilmsHelper from "../helpers/FilmsHelper";
import FavStar from "../FavStar";
import { useTranslation } from "react-i18next";

function FilmCard({ filmId, films }) {
  const { t } = useTranslation();
  const film =
    !films || !films.items || films.items.find((fobj) => fobj.id === filmId);
  if (!film) {
    return null;
  } else {
    return (
      <Card style={{ width: "100%" }}>
        <Card.Body className="justify">
          <Card.Title>
            {film.title} <FavStar id={filmId} type="film" />
          </Card.Title>
          <Card.Subtitle className="mb-2 text-muted">
            {FilmsHelper.getSubtitle(film)}
          </Card.Subtitle>
          <Card.Text className="card-crawl">{film.opening_crawl}</Card.Text>
          <Card.Text>
            <b>{t("ReleaseDate")}</b> {film.release_date}
          </Card.Text>
          <Card.Text>
            <b>{t("Director")}</b> {film.director}
          </Card.Text>
          <Card.Text>
            <b>{t("Producer")}</b> {film.producer}
          </Card.Text>
          <b>
            {t("Characters")} ({film.characters?.length ?? 0}):{" "}
          </b>
          <CharacterList film={film} />
        </Card.Body>
        <Card.Img variant="bottom" src={film.coverImage} />
      </Card>
    );
  }
}

// Redux
const mapStateToProps = (state) => {
  return {
    films: state.films,
  };
};

export default connect(mapStateToProps)(FilmCard);
