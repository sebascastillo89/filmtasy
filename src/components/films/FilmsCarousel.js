import React from "react";
import { connect } from "react-redux";
import Spinner from "../Spinner";
import ImgCarousel from "../carousel/ImgCarousel";

function FilmsCarousel({ films }) {
  console.log("FilmsCarousel");
  if (films.isFetching) {
    return <Spinner />;
  } else if (!films.items) {
    return null;
  } else {
    console.log("FilmsCarousel dentro");
    const carouselData = films.items.map((film) => {
      return {
        title: film.title,
        subtitle: "Episode " + film.episode_id,
        imgSrc: film.coverImage,
      };
    });

    return <ImgCarousel data={carouselData} interval="2500" />;
  }
}

// Redux
const mapStateToProps = (state) => {
  return {
    films: state.films,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(FilmsCarousel);
