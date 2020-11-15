import React from "react";
import { Card } from "react-bootstrap";
import FavStar from "../favs/FavStar";

function FilmCard({ title, subtitle, src, id }) {
  return (
    <Card className="text-center" style={{ width: "18rem" }}>
      <Card.Img variant="top" src={src} />
      <Card.Body>
        <Card.Title>{title}</Card.Title>
        <Card.Text>{subtitle}</Card.Text>
        <Card.Text>
          <FavStar id={id} type="film" />
        </Card.Text>
        <Card.Link variant="bottom" href={"films/" + id}>
          Show more
        </Card.Link>
      </Card.Body>
    </Card>
  );
}

export default FilmCard;
