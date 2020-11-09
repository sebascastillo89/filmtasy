import { React, useEffect } from "react";
import "./App.css";
import TitleBox from "./components/TitleBox";
import ErrorBox from "./components/ErrorBox";
import FilmContainer from "./components/films/FilmContainer";
import Card from "./components/card/Card";
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
      <FilmContainer />
      <Card />
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
