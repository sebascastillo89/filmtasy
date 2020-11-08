import React from "react";
import { Spinner } from "react-bootstrap";

export default function WithDataFetching(WrappedComponent) {
  const data = { ...this.props.data };
  if (data.isFailed) {
    return null;
  } else if (data.isFetching || !data.items) {
    return (
      <Spinner animation="border" role="status">
        <span className="sr-only">Loading...</span>
      </Spinner>
    );
  } else {
    return <WrappedComponent {...this.props} />;
  }
}
