import React from "react";
import { ListGroup } from "react-bootstrap";
import FilmList from "./FilmList";
import FilmsCarousel from "./FilmsCarousel";
import FilmsCardContainer from "./FilmsCardContainer";
function FilmContainer() {
  /*return (
    <div>
      <p>Click in a film to retrieve more information:</p>
      <ListGroup style={{ width: "30%", float: "left" }}>
        <FilmList />
      </ListGroup>
      <p>Carousel:</p>
      <FilmsCarousel />
      <p>Cards:</p>
      <FilmsCardContainer />
    </div>
  );*/

  return (
    <div>
      <p>Click in a film to retrieve more information:</p>
      <FilmsCardContainer />
    </div>
  );
}
export default FilmContainer;
