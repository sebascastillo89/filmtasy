import React from "react";
import { connect } from "react-redux";
import { Alert } from "react-bootstrap";
import { removeError } from "../store/actions/index";

export const errorCatalog = {
  errorFetchingFilms: "Error fetching films from API",
  errorFetchingFilm: "Error fetching a film from API",
  errorFetchingCharacter: "Error fetching a character from API",
};

function ErrorBox({ errors, removeError }) {
  if (!errors || errors.length === 0) {
    return null;
  } else {
    const alerts = errors.map((error, index) => {
      const errorMessage = errorCatalog[error] ?? error;
      return (
        <Alert
          key={index}
          variant="danger"
          onClose={() => removeError(index)}
          dismissible
        >
          {errorMessage}
        </Alert>
      );
    });
    return <div>{alerts}</div>;
  }
}

// Redux
const mapStateToProps = (state) => {
  return {
    errors: state.errors,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    removeError: (index) => dispatch(removeError(index)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ErrorBox);
