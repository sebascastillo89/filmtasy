import React from "react";
import { connect } from "react-redux";
import { Alert } from "react-bootstrap";
import { resetError } from "../store/actions";

function ErrorBox({ errors, resetError }) {
  const alerts = errors.map((error, index) => {
    return (
      <Alert variant="danger" onClose={() => resetError(index)} dismissible>
        {error}
      </Alert>
    );
  });
  return <div>{alerts}</div>;
}

// Redux
const mapStateToProps = (state) => {
  return {
    errors: state.errors,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    resetError: (index) => dispatch(resetError(index)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ErrorBox);
