import React from "react";
import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";

function FilmCard({ title, subtitle, src, id }) {
  return (
    <Link to={"films/" + id}>
      <Card className="text-center p-3" style={{ width: "18rem" }}>
        <Card.Img variant="top" src={src} />
        <Card.Body>
          <Card.Title>{title}</Card.Title>
          <Card.Text>{subtitle}</Card.Text>
        </Card.Body>
      </Card>
    </Link>
  );
}

export default FilmCard;
