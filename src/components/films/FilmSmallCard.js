import React from "react";
import { Card } from "react-bootstrap";
import FavStar from "../FavStar";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

function FilmCard({ title, subtitle, src, id }) {
  const { t } = useTranslation();
  return (
    <Card className="filmSmallCard text-center" style={{ width: "18rem" }}>
      <Card.Img variant="top" src={src} />
      <Card.Body>
        <Card.Title>{title}</Card.Title>
        <Card.Text>{subtitle}</Card.Text>
        <Card.Text>
          <FavStar id={id} type="film" />
        </Card.Text>
        <Link className="showMore" to={"films/" + id}>
          {t("ShowMore")}
        </Link>
      </Card.Body>
    </Card>
  );
}

export default FilmCard;
