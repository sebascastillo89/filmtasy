import React from "react";
import { connect } from "react-redux";
import { Alert } from "react-bootstrap";

function ErrorBox({ errors }) {
  const alerts = errors.map((error, index) => {
    return (
      <Alert
        variant="danger"
        onClose={() => console.log("reset error")}
        dismissible
      >
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

export default connect(mapStateToProps)(ErrorBox);
