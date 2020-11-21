import React from "react";
import { Navbar, Nav } from "react-bootstrap";
import logo from "./images/logo.svg";
import { LinkContainer } from "react-router-bootstrap";

export default function NavBar() {
  return (
    <>
      <Navbar expand="sm" bg="dark" variant="dark">
        <LinkContainer to="/">
          <Navbar.Brand className="filmtasyLogo">
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
            <Nav.Link className="filmsLink">Films</Nav.Link>
          </LinkContainer>
          <LinkContainer to="/favourites">
            <Nav.Link className="favLink">Favourites</Nav.Link>
          </LinkContainer>
          <LinkContainer to="/about">
            <Nav.Link className="aboutLink">About</Nav.Link>
          </LinkContainer>
        </Nav>
      </Navbar>
      <br />
    </>
  );
}
