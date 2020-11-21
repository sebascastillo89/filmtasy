import React, { useEffect } from "react";
import { connect } from "react-redux";
import { fetchAllFilms } from "../store/actions/index";
import Spinner from "../components/Spinner";
import FilmsBoard from "../components/films/FilmsBoard";
import { Button } from "react-bootstrap";

function Favourites({ films, getFilms }) {
  useEffect(() => {
    getFilms();
  }, []);

  function onClear(e) {
    e.preventDefault();
    localStorage.clear();
    alert("Stored keys were cleaned");
    getFilms();
  }

  if (films.isFetching) {
    return <Spinner />;
  } else {
    return (
      <>
        <FilmsBoard onlyFav />
        <div>
          <Button
            className="clear-cache"
            onClick={(e) => onClear(e)}
            variant="secondary"
            size="lg"
            block
          >
            Clear cache
          </Button>
        </div>
      </>
    );
  }
}

// Redux
const mapStateToProps = (state) => {
  return {
    films: state.films,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getFilms: () => dispatch(fetchAllFilms()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Favourites);
