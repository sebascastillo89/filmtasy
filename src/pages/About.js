import React from "react";
import { Jumbotron, Button } from "react-bootstrap";

function About() {
  return (
    <Jumbotron>
      <h1>Think outside the box!</h1>
      <p className="about-text">
        Hi! My name is Sebastián Castillo. I am a software developer and
        Filmtasy is a personal side project to learn React.
      </p>
      <p className="about-repo">
        Visit the Github public repository to learn more about this project.
      </p>

      <Button
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
