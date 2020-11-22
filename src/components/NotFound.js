import React from "react";
import yoda from "./images/yoda.jpg";

function NotFound() {
  return (
    <>
      <h3>Found, page could not be</h3>
      <img src={yoda} height="20%" width="20%" alt="Yoda" />
      <p>
        Do. Or do not. There is no try.{" "}
        <a className="not-found" href="/">
          Return home
        </a>
      </p>
    </>
  );
}

export default NotFound;
