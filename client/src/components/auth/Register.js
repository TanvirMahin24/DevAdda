import React, { Fragment, useState } from "react";
import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import setAlert from "../../actions/alert";
import { register } from "../../actions/auth";
import PropTypes from "prop-types";
import style from "./Login.module.scss";

const Register = ({ setAlert, register, isAuthenticated }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    password2: "",
  });
  const { name, email, password, password2 } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    if (password !== password2) {
      setAlert("Password doesn't match", "danger");
    } else {
      register({ name, email, password });
    }
  };

  //Redirect if auth
  if (isAuthenticated) {
    return <Redirect to="/dashboard" />;
  }

  return (
    <Fragment>
      <div className={style.bgCode}>
        <div className="container pt-3">
          <div className="row">
            <div className="col-md-6 offset-md-3">
              <div className="card card-body shadow shadow-sm bg-white p-3 text-center mb-4">
                <div className={style.fontFix}>
                  <i className="fas fa-user"></i>
                </div>
                <h2 className="text-primary pb-3">Sign Up</h2>
                <form onSubmit={(e) => onSubmit(e)}>
                  <div className="form-group">
                    <input
                      type="text"
                      placeholder="Name"
                      name="name"
                      className="form-control"
                      value={name}
                      onChange={(e) => onChange(e)}
                    />
                  </div>
                  <div className="form-group">
                    <input
                      type="email"
                      placeholder="Email Address"
                      name="email"
                      value={email}
                      className="form-control"
                      onChange={(e) => onChange(e)}
                    />
                    <label for="email text-left">
                      <small>
                        This site uses Gravatar so if you want a profile image,
                        use a Gravatar email
                      </small>
                    </label>
                  </div>
                  <div className="form-group">
                    <input
                      type="password"
                      className="form-control"
                      placeholder="Password"
                      name="password"
                      value={password}
                      onChange={(e) => onChange(e)}
                    />
                  </div>
                  <div className="form-group">
                    <input
                      type="password"
                      className="form-control"
                      placeholder="Confirm Password"
                      name="password2"
                      value={password2}
                      onChange={(e) => onChange(e)}
                    />
                  </div>
                  <input
                    type="submit"
                    className="form-control btn btn-primary"
                    value="Register"
                  />
                </form>
                <p className="pt-3">
                  Already have an account? <Link to="/login">Login</Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

Register.propTypes = {
  setAlert: PropTypes.func.isRequired,
  register: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool,
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, { setAlert, register })(Register);
