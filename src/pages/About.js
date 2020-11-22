import React from "react";
import { Jumbotron, Button } from "react-bootstrap";
import { useTranslation } from "react-i18next";

function About() {
  const { t } = useTranslation();

  return (
    <Jumbotron>
      <h1>Think outside the box!</h1>
      <p className="about-text">{t("Hello")}</p>
      <p className="about-repo">{t("VisitGithub")}</p>

      <Button
        className="repo-link"
        href="https://github.com/sebascastillo89/filmtasy"
        target="_blank"
        variant="primary"
      >
        Github Repo
      </Button>
    </Jumbotron>
  );
}

export default About;
