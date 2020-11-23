import React from "react";
import { Card } from "react-bootstrap";
import FavStar from "../FavStar";
import { Link } from "react-router-dom";

function FilmCard({ title, subtitle, src, id }) {
  return (
    <Card className="filmSmallCard text-center" style={{ width: "18rem" }}>
      <Link className="linkAsText showMore" to={"films/" + id}>
        <Card.Img variant="top" src={src} className="small-card-img" />
        <Card.Body className="linkAsText">
          <Card.Title>{title}</Card.Title>
          <Card.Text>{subtitle}</Card.Text>
        </Card.Body>
      </Link>
      <FavStar id={id} type="film" />
    </Card>
  );
}

export default FilmCard;
