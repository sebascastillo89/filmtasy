import React from "react";
import yoda from "../yoda.jpg";

function NotFound() {
  return (
    <>
      <h3>Found, page could not be</h3>
      <img src={yoda} height="20%" width="20%" alt="Yoda" />
      <p>
        Do. Or do not. There is no try. <a href="/">Return home</a>
      </p>
    </>
  );
}

export default NotFound;
