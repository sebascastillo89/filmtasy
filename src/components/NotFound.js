import React from "react";
import yoda from "../yoda.jpg";

function NotFound() {
  //TODO falta link return home
  return (
    <>
      <h3>Found, page could not be</h3>
      <img src={yoda} height="20%" width="20%" alt="Yoda" />
      <p>Do. Or do not. There is no try. Return home</p>
    </>
  );
}

export default NotFound;
