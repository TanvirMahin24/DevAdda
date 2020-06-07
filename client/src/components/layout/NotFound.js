import React, { Fragment } from "react";

const NotFound = () => {
  return (
    <Fragment>
      <h1 className="x-large text-primary">
        <i className="fas fa-exclamation-triangle"></i> Page Not Found | 404
      </h1>
      <p>Sorry,This page does not exist :(</p>
    </Fragment>
  );
};

export default NotFound;
