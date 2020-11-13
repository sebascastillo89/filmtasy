import { React } from "react";
import { connect } from "react-redux";
import { Card } from "react-bootstrap";
import CharacterList from "../characters/CharacterList";
import NotFound from "../NotFound";
import * as FilmsHelper from "./FilmsHelper";
import FavStar from "../favs/FavStar";

function FilmCard({ filmId, films }) {
  const film = films.items.find((fobj) => fobj.id === filmId);

  if (!film) {
    return <NotFound />;
  } else {
    return (
      <Card style={{ width: "75%" }}>
        <Card.Body>
          <Card.Img variant="top" src={film.coverImage} />
          <Card.Title>
            <FavStar id={filmId} type="film" />
          </Card.Title>
          <Card.Title>{film.title}</Card.Title>
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
        </Card.Body>
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
