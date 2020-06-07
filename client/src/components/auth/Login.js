import React, { useState } from "react";
import { connect } from "react-redux";
import { Link, Redirect } from "react-router-dom";
import PropTypes from "prop-types";
import { login } from "../../actions/auth";
import style from "./Login.module.scss";

const Login = ({ login, isAuthenticated }) => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const { email, password } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    login(email, password);
  };

  //Redirect if auth
  if (isAuthenticated) {
    return <Redirect to="/posts" />;
  }

  return (
    <div className={style.bgCode}>
      <div className="container pt-5">
        <div className="row">
          <div className="col-md-6 offset-md-3">
            <div className="card card-body shadow shadow-sm bg-white p-4 text-center mt-4">
              <div className={style.fontFix}>
                <i className="fas fa-user"></i>
              </div>
              <h2 className="text-primary pt-2 pb-3">Login Now</h2>
              <form onSubmit={(e) => onSubmit(e)}>
                <div className="form-group">
                  <input
                    type="email"
                    placeholder="Email Address"
                    name="email"
                    value={email}
                    className="form-control"
                    onChange={(e) => onChange(e)}
                    required
                  />
                </div>
                <div className="form-group">
                  <input
                    type="password"
                    placeholder="Password"
                    name="password"
                    className="form-control"
                    minLength="6"
                    value={password}
                    onChange={(e) => onChange(e)}
                  />
                </div>
                <div className="form-group mt-3">
                  <input
                    type="submit"
                    className="form-control btn btn-primary"
                    value="Login"
                  />
                </div>
              </form>
              <p className="float-right pr-3">
                Don't have an account? <Link to="/register">Sign Up</Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

Login.propTypes = {
  login: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool,
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, { login })(Login);
