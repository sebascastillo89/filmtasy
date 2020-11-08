import { React, useEffect } from "react";
import TitleBox from "./components/TitleBox";
import ErrorBox from "./components/ErrorBox";
import FilmList from "./components/films/FilmList";
import FilmCard from "./components/filmCard/FilmCard";
import { fetchFilms } from "./actions/index";
import { connect } from "react-redux";

function App({ fetchFilms }) {
  useEffect(() => {
    fetchFilms();
  }, [fetchFilms]);

  return (
    <div className="App">
      <TitleBox />
      <ErrorBox />
      <FilmList />
      <FilmCard />
    </div>
  );
}

// Redux
const mapStateToProps = (state) => {
  return state;
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchFilms: () => dispatch(fetchFilms()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
