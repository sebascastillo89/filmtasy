import React from "react";
import { Navbar, Nav, Form, FormControl } from "react-bootstrap";
import logo from "./images/logo.svg";
import { LinkContainer } from "react-router-bootstrap";
import { useTranslation } from "react-i18next";

export default function NavBar() {
  const { t, i18n } = useTranslation();
  function onChangeLang(e) {
    i18n.changeLanguage(e.target.value);
  }
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
            <Nav.Link className="filmsLink">{t("Films")}</Nav.Link>
          </LinkContainer>
          <LinkContainer to="/favourites">
            <Nav.Link className="favLink">{t("Favourites")}</Nav.Link>
          </LinkContainer>
          <LinkContainer to="/about">
            <Nav.Link className="aboutLink">{t("About")}</Nav.Link>
          </LinkContainer>
        </Nav>
        <Form inline>
          <FormControl size="sm" as="select" onChange={(e) => onChangeLang(e)}>
            <option>EN</option>
            <option>ES</option>
          </FormControl>
        </Form>
      </Navbar>
      <br />
    </>
  );
}
