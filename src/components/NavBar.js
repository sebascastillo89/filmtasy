import React from "react";
import { Navbar, Nav } from "react-bootstrap";
import logo from "./images/logo.svg";
export default function NavBar() {
  return (
    <>
      <Navbar expand="sm" bg="dark" variant="dark">
        <Navbar.Brand href="/">
          <img
            src={logo}
            width="30"
            height="30"
            className="d-inline-block align-top"
            alt="React Bootstrap logo"
          />
          Filmtasy
        </Navbar.Brand>
        <Nav className="mr-auto">
          <Nav.Link href="/">Films</Nav.Link>
          <Nav.Link href="/favourites">Favourites</Nav.Link>
          <Nav.Link href="/about">About</Nav.Link>
        </Nav>
      </Navbar>
      <br />
    </>
  );
}
