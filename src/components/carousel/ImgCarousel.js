import React from "react";
import { Carousel } from "react-bootstrap";
import ImgCarouselItem from "./ImgCarouselItem";

function ImgCarousel({ data, interval }) {
  const carouselItems = data.map((item, index) => {
    console.log("ImgCarousel dentro para index " + index);
    return (
      <Carousel.Item>
        <img className="d-block w-100" src={item.imgSrc} alt="First slide" />
        <Carousel.Caption>
          <h1>{item.title}</h1>
          <p>{item.subtitle}</p>
        </Carousel.Caption>
      </Carousel.Item>
    );
  });
  console.log("ImgCarousel fin " + carouselItems);

  return (
    <Carousel style={{ width: "30%", float: "left" }}>{carouselItems}</Carousel>
  );
}

export default ImgCarousel;
