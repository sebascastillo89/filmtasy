import React from "react";
import "./App.css";
import TitleBox from "./components/TitleBox";
import ErrorBox from "./components/ErrorBox";
import FilmsBoard from "./components/films/FilmsBoard";
import FilmCard from "./components/films/FilmCard";
import CharacterCard from "./components/characters/CharacterCard";
import { connect } from "react-redux";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <TitleBox />
      <ErrorBox />
      <Router>
        <div>
          <Link to="/">
            <button>Home</button>
          </Link>
          <Link to="/films/1">
            <button>Films</button>
          </Link>
          <Link to="/characters/1">
            <button>Characters</button>
          </Link>
          <Switch>
            <Route exact path="/">
              <FilmsBoard />
            </Route>
            <Route exact path="/films/:id">
              <FilmCard />
            </Route>
            <Route exact path="/characters/:id">
              <CharacterCard />
            </Route>
          </Switch>
        </div>
      </Router>
    </div>
  );
}

// Redux
const mapStateToProps = (state) => {
  return state;
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
