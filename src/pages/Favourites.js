import { React, useEffect } from "react";
import { connect } from "react-redux";
import { fetchAllFilms } from "../store/actions/index";
import Spinner from "../components/Spinner";

function Favourites({ films, getFilms }) {
  useEffect(() => {
    getFilms();
  }, []);

  function clearStorage() {
    console.log("Your favourites has been removed successfully");
    localStorage.clear();
  }

  if (films.isFetching) {
    return <Spinner />;
  } else {
    return (
      <>
        <h1>Aqui se mostrarán solo las peliculas favoritas</h1>
        <button onClick={() => clearStorage()}>BORRAR CACHE</button>
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
