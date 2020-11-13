import React from "react";
import "./App.css";
import TitleBox from "./components/TitleBox";
import ErrorBox from "./components/ErrorBox";
import { connect } from "react-redux";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Films from "./pages/Films";
import Film from "./pages/Film";
import Character from "./pages/Character";

function App() {
  function clearStorage() {
    console.log("clearStorage");
    localStorage.clear();
  }
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
              <Films />
            </Route>
            <Route exact path="/films/:id">
              <Film />
            </Route>
            <Route exact path="/characters/:id">
              <Character />
            </Route>
            <Route exact path="/clearStorage">
              <button onClick={() => clearStorage()}>BORRAR CACHE</button>
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
export default connect(mapStateToProps)(App);
