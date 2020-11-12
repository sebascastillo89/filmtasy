import { React, useEffect } from "react";
import { useParams } from "react-router-dom";
import { connect } from "react-redux";
import { Card, Button } from "react-bootstrap";
import FavBadge from "../FavBadge";
import Spinner from "../Spinner";
import CharacterList from "../characters/CharacterList";
import * as FilmsHelper from "./FilmsHelper";

import {
  fetchFilm,
  saveFilmAsFavourite,
  removeFilmFromFavourite,
} from "../../store/actions";

function FilmCard({ films, currentFilm, saveAsFav, removeFromFav, getFilm }) {
  let { id } = useParams();
  const filmId = parseInt(id);
  useEffect(() => {
    getFilm(filmId);
  }, [films]);

  const onFavouriteClick = (fav) => {
    !fav ? saveAsFav(filmId) : removeFromFav(filmId);
  };

  const isCurrentFilm = currentFilm.id === parseInt(filmId);

  if (!isCurrentFilm || currentFilm.isFetchingFilm) {
    return <Spinner />;
  } else {
    const film = films.items.find((f) => f.id === filmId);
    if (!film) {
      return null; //TODO que hacemos aqui??
    } else {
      const fav = film.isFavourite;
      return (
        <center>
          <Card style={{ width: "75%" }}>
            <Card.Body>
              <Card.Img variant="top" src={film.coverImage} />
              <Card.Title>
                {film.title} {fav ? <FavBadge /> : null}
              </Card.Title>
              <Card.Subtitle className="mb-2 text-muted">
                {FilmsHelper.getSubtitle(film)}
              </Card.Subtitle>
              <Card.Text>{film.opening_crawl}</Card.Text>
              <Card.Text>
                <b>Release date:</b> {film.release_date}
              </Card.Text>
              <Card.Text>
                <b>Director:</b> {film.director}
              </Card.Text>
              <Card.Text>
                <b>Producer:</b> {film.producer}
              </Card.Text>
              <Card.Text>
                <b>Characters ({film.characters.length}):</b>
              </Card.Text>
              <CharacterList film={film} />
              <br />
              <Button
                variant={fav ? "dark" : "warning"}
                onClick={() => onFavouriteClick(fav)}
              >
                {fav ? "Remove from favourites" : "Add to favourites"}
              </Button>
            </Card.Body>
          </Card>
        </center>
      );
    }
  }
}

// Redux
const mapStateToProps = (state) => {
  return {
    films: state.films,
    currentFilm: state.currentFilm,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getFilm: (index) => dispatch(fetchFilm(index)),
    saveAsFav: (index) => dispatch(saveFilmAsFavourite(index)),
    removeFromFav: (index) => dispatch(removeFilmFromFavourite(index)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(FilmCard);
