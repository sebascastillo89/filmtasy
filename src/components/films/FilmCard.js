import React from "react";
import { Card } from "react-bootstrap";

function FilmCard({ title, subtitle, src }) {
  return (
    <Card
      className="text-center p-3"
      style={{ width: "18rem" }}
      onClick={() => alert("jaja" + title)}
    >
      <Card.Img variant="top" src={src} />
      <Card.Body>
        <Card.Title>{title}</Card.Title>
        <Card.Text>{subtitle}</Card.Text>
      </Card.Body>
    </Card>
  );
}

export default FilmCard;
