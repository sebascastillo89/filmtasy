import { React } from "react";
import { connect } from "react-redux";
import { Card, Button } from "react-bootstrap";
import FavBadge from "../FavBadge";
import CharacterList from "../characters/CharacterList";
import * as FilmsHelper from "./FilmsHelper";

function FilmCard({ filmId, films }) {
  const film = films.items.find((fobj) => fobj.id === filmId);

  if (!film) {
    return null; //TODO ??
  } else {
    const fav = false;
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
              onClick={() => console.log("FAV FILM")}
            >
              {fav ? "Remove from favourites" : "Add to favourites"}
            </Button>
          </Card.Body>
        </Card>
      </center>
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
