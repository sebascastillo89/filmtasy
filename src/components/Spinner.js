import React from "react";
import { Spinner as BSSpinner } from "react-bootstrap";

function Spinner() {
  return (
    <BSSpinner className="filmtasySpinner" animation="border" role="status">
      <span className="sr-only">Loading...</span>
    </BSSpinner>
  );
}

export default Spinner;
