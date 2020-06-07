import React, { Fragment, useState } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { logout } from "../../actions/auth";
import style from "./Navbar.module.css";

const Navbar = ({ auth: { isAuthenticated, loading }, logout }) => {
  const [isOpen, setOpen] = useState(false);
  const authLinks = (
    <ul>
      <li>
        <Link to="/posts">
          {" "}
          <i className="fas fa-globe"></i> Forum
        </Link>
      </li>
      <li>
        <Link to="/profiles">
          {" "}
          <i className="fas fa-users"></i> Developers
        </Link>
      </li>
      <li>
        <Link to="/dashboard">
          <i className="fas fa-user"></i>{" "}
          <span className="hide-sm">Dashboard</span>
        </Link>
      </li>
      <li>
        <a href="#!" onClick={logout}>
          <i className="fas fa-sign-out-alt"></i>{" "}
          <span className="hide-sm">Logout</span>
        </a>
      </li>
    </ul>
  );

  const guestLinks = (
    <ul>
      <li>
        <Link to="/profiles">Developers</Link>
      </li>
      <li>
        <Link to="/register">Register</Link>
      </li>
      <li>
        <Link to="/login">Login</Link>
      </li>
    </ul>
  );

  return (
    <nav className={style.navbarCustom}>
      <h1>
        {!loading && (
          <Fragment>
            {" "}
            {isAuthenticated ? (
              <Link to="/posts">
                <i className="fas fa-code"></i> DevAdda
              </Link>
            ) : (
              <Link to="/">
                <i className="fas fa-code"></i> DevAdda
              </Link>
            )}{" "}
          </Fragment>
        )}
      </h1>
      {!loading && (
        <Fragment>
          <div className={style.hamburger} onClick={(e) => setOpen(!isOpen)}>
            <i className="fas fa-bars"></i>
          </div>
          <div
            className={style.navActions}
            style={!isOpen ? { top: "-2000px" } : { top: "0px" }}
          >
            {" "}
            {isAuthenticated ? authLinks : guestLinks}{" "}
          </div>
        </Fragment>
      )}
    </nav>
  );
};

Navbar.propTypes = {
  logout: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapToStateProps = (state) => ({
  auth: state.auth,
});

export default connect(mapToStateProps, { logout })(Navbar);
