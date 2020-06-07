import React, { Fragment } from "react";
import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import style from "./Landing.module.scss";

const Landing = ({ isAuthenticated }) => {
  //Redirect if auth
  if (isAuthenticated) {
    return <Redirect to="/posts" />;
  }
  return (
    <Fragment>
      <section className={style.landing}>
        <div className="container">
          <div className="row">
            <div className="col-md-12 text-light">
              <div className={style.leftLanding}>
                <h1 className="font-weight-light display-3 my-auto mb-3">
                  DevAdda
                </h1>
                <p className="lead">
                  Create a developer profile/portfolio, share posts and get help
                  from other developers
                </p>
                <div className="buttons">
                  <Link to="/register" className="btn btn-primary px-4">
                    Sign Up
                  </Link>
                  <Link to="/login" className="ml-3 btn btn-primary px-4">
                    Login
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Fragment>
  );
};

Landing.propTypes = {
  isAuthenticated: PropTypes.bool,
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps)(Landing);
