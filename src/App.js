import React from "react";
import "./App.css";
import ErrorBox from "./components/ErrorBox";
import NavBar from "./components/NavBar";
import { connect } from "react-redux";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Films from "./pages/Films";
import Film from "./pages/Film";
import Character from "./pages/Character";
import Favourites from "./pages/Favourites";
import About from "./pages/About";

function App() {
  return (
    <div className="App">
      <NavBar />
      <ErrorBox />
      <Router>
        <div>
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
            <Route exact path="/favourites">
              <Favourites />
            </Route>
            <Route exact path="/about">
              <About />
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
