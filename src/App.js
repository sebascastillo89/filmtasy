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
  return (
    <div className="App">
      <center>
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
            </Switch>
          </div>
        </Router>
      </center>
    </div>
  );
}

// Redux
const mapStateToProps = (state) => {
  return state;
};
export default connect(mapStateToProps)(App);
