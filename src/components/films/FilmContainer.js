import React from "react";
import { ListGroup } from "react-bootstrap";
import FilmList from "./FilmList";

function FilmContainer() {
  return (
    <div>
      <p>Click in a film to retrieve more information:</p>
      <ListGroup style={{ width: "30%", float: "left" }}>
        <FilmList />
      </ListGroup>
    </div>
  );
}
export default FilmContainer;
