import React from "react";
import "./App.css";
import { Container } from "react-bootstrap";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import ErrorBox from "./components/ErrorBox";
import NavBar from "./components/NavBar";
import Films from "./pages/Films";
import CurrentFilm from "./pages/CurrentFilm";
import CurrentCharacter from "./pages/CurrentCharacter";
import Favourites from "./pages/Favourites";
import About from "./pages/About";

function App() {
  return (
    <Container fluid>
      <div className="App">
        <Router>
          <NavBar />
          <ErrorBox />
          <div>
            <Switch>
              <Route exact path="/">
                <Films />
              </Route>
              <Route exact path="/films/:id">
                <CurrentFilm />
              </Route>
              <Route exact path="/characters/:id">
                <CurrentCharacter />
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
    </Container>
  );
}

export default App;
