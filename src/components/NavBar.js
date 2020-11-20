import React from "react";
import { Navbar, Nav } from "react-bootstrap";
import logo from "./images/logo.svg";
import { LinkContainer } from "react-router-bootstrap";

export default function NavBar() {
  return (
    <>
      <Navbar expand="sm" bg="dark" variant="dark">
        <LinkContainer to="/">
          <Navbar.Brand>
            <img
              src={logo}
              width="30"
              height="30"
              className="d-inline-block align-top"
              alt="React Bootstrap logo"
            />
            Filmtasy
          </Navbar.Brand>
        </LinkContainer>
        <Nav className="mr-auto">
          <LinkContainer to="/">
            <Nav.Link>Films</Nav.Link>
          </LinkContainer>
          <LinkContainer to="/favourites">
            <Nav.Link>Favourites</Nav.Link>
          </LinkContainer>
          <LinkContainer to="/about">
            <Nav.Link>About</Nav.Link>
          </LinkContainer>
        </Nav>
      </Navbar>
      <br />
    </>
  );
}
