import React from "react";
import CharacterList from "./CharacterList";
import { connect } from "react-redux";
import { Card, Spinner, Badge, Button } from "react-bootstrap";
import {
  saveFilmAsFavourite,
  removeFilmFromFavourite,
} from "../../actions/index";

function FilmData({ films, card, saveAsFav, removeFromFav }) {
  const onFavouriteClick = (fav) => {
    !fav ? saveAsFav(card.selectedFilm) : removeFromFav(card.selectedFilm);
  };

  if (card.isLoading) {
    return (
      <Spinner animation="border" role="status">
        <span className="sr-only">Loading...</span>
      </Spinner>
    );
  } else if (card.selectedFilm === null) {
    return null;
  } else {
    const film = films.items[card.selectedFilm];
    const fav = films.favourites.includes(card.selectedFilm);
    return (
      <Card style={{ width: "50%" }}>
        <Card.Body>
          <Card.Title>
            {film.title}{" "}
            {fav ? (
              <Badge pill variant="warning">
                Favourite
              </Badge>
            ) : null}
          </Card.Title>
          <Card.Subtitle className="mb-2 text-muted">
            Episode {film.episode_id}
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
            <b>Characters:</b>
          </Card.Text>
          <CharacterList />
          <Button
            variant={fav ? "dark" : "warning"}
            onClick={() => onFavouriteClick(fav)}
          >
            {fav ? "Remove from favourites" : "Add to favourites"}
          </Button>
        </Card.Body>
      </Card>
    );
  }
}

// Redux
const mapStateToProps = (state) => {
  return {
    card: state.card,
    films: state.films,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    saveAsFav: (index) => dispatch(saveFilmAsFavourite(index)),
    removeFromFav: (index) => dispatch(removeFilmFromFavourite(index)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(FilmData);
