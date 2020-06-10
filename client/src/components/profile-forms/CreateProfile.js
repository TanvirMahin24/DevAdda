import React, { useState, Fragment } from "react";
import { Link, withRouter } from 'react-router-dom';
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { createProfile } from '../../actions/profile';

const CreateProfile = ({createProfile , history}) => {
  const [FormData, setFormData] = useState({
    company: "",
    website: "",
    location: "",
    status: "",
    skills: "",
    githubusername: "",
    bio: "",
    facebook: "",
    twitter: "",
    linkedin: "",
    youtube: "",
    instagram: "",
  });
  const [displaySocialInput, toogleSocialInput] = useState(false);

  const {
    company,
    website,
    location,
    status,
    skills,
    githubusername,
    bio,
    facebook,
    twitter,
    linkedin,
    youtube,
    instagram,
  } = FormData;

  const onChange = (e) =>
    setFormData({
      ...FormData,
      [e.target.name]: e.target.value,
    });

    const onSubmit = e => {
        e.preventDefault();
        createProfile(FormData , history);
    };
  return (
    <div className='container card card-body shadow shadow-sm my-4'>
      <h1 className="text-dark">Create Your Profile</h1>
      <p className="lead">
        <i className="fas fa-user"></i> Let's get some information to make your
        profile stand out
      </p>
      <small>* = required field</small>
      <form className="form" onSubmit={e => onSubmit(e)}>
        <div className="form-group">
          <select className='form-control' name="status" value={status} onChange={(e) => onChange(e)}>
            <option value="0">* Select Professional Status</option>
            <option value="Developer">Developer</option>
            <option value="Junior Developer">Junior Developer</option>
            <option value="Senior Developer">Senior Developer</option>
            <option value="Manager">Manager</option>
            <option value="Student or Learning">Student or Learning</option>
            <option value="Instructor">Instructor or Teacher</option>
            <option value="Intern">Intern</option>
            <option value="Other">Other</option>
          </select>
          <small className="form-text">
            Give us an idea of where you are at in your career
          </small>
        </div>
        <div className="form-group">
          <input
			className='form-control'
            type="text"
            placeholder="Company"
            name="company"
            value={company}
            onChange={(e) => onChange(e)}
          />
          <small className="form-text">
            Could be your own company or one you work for
          </small>
        </div>
        <div className="form-group">
          <input
			className='form-control'
            type="text"
            placeholder="Website"
            name="website"
            value={website}
            onChange={(e) => onChange(e)}
          />
          <small className="form-text">
            Could be your own or a company website
          </small>
        </div>
        <div className="form-group">
          <input
			className='form-control'
            type="text"
            placeholder="Location"
            name="location"
            value={location}
            onChange={(e) => onChange(e)}
          />
          <small className="form-text">
            City & state suggested (eg. Boston, MA)
          </small>
        </div>
        <div className="form-group">
          <input
			className='form-control'
            type="text"
            placeholder="* Skills"
            name="skills"
            value={skills}
            onChange={(e) => onChange(e)}
          />
          <small className="form-text">
            Please use comma separated values (eg. HTML,CSS,JavaScript,PHP)
          </small>
        </div>
        <div className="form-group">
          <input
			className='form-control'
            type="text"
            placeholder="Github Username"
            name="githubusername"
            value={githubusername}
            onChange={(e) => onChange(e)}
          />
          <small className="form-text">
            If you want your latest repos and a Github link, include your
            username
          </small>
        </div>
        <div className="form-group">
          <textarea
			className='form-control'
            placeholder="A short bio of yourself"
            name="bio"
            value={bio}
            onChange={(e) => onChange(e)}
          ></textarea>
          <small className="form-text">Tell us a little about yourself</small>
        </div>

        <div className="my-2">
          <button
            onClick={() => toogleSocialInput(!displaySocialInput)}
            type="button"
            className="btn btn-outline-primary mr-3"
          >
            Add Social Network Links
          </button>
          <span>Optional</span>
        </div>

        {displaySocialInput && (
          <Fragment>
            <div className="form-group social-input">
              <i className="fab fa-twitter"></i> Twitter
              <input
				className='form-control'
                type="text"
                placeholder="Twitter URL"
                name="twitter"
                value={twitter}
                onChange={(e) => onChange(e)}
              />
            </div>

            <div className="form-group social-input">
              <i className="fab fa-facebook"></i> Facebook
              <input
				className='form-control'
                type="text"
                placeholder="Facebook URL"
                name="facebook"
                value={facebook}
                onChange={(e) => onChange(e)}
              />
            </div>

            <div className="form-group social-input">
              <i className="fab fa-youtube"></i> YouTube
              <input
				className='form-control'
                type="text"
                placeholder="YouTube URL"
                name="youtube"
                value={youtube}
                onChange={(e) => onChange(e)}
              />
            </div>

            <div className="form-group social-input">
              <i className="fab fa-linkedin"></i> Linkedin
              <input
				className='form-control'
                type="text"
                placeholder="Linkedin URL"
                name="linkedin"
                value={linkedin}
                onChange={(e) => onChange(e)}
              />
            </div>

            <div className="form-group social-input">
              <i className="fab fa-instagram "></i> Instagram
              <input
				className='form-control'
                type="text"
                placeholder="Instagram URL"
                name="instagram"
                value={instagram}
                onChange={(e) => onChange(e)}
              />
            </div>
          </Fragment>
        )}

        <input type="submit" className="btn btn-primary my-1 mr-2" />
        <Link className="btn btn-primary my-1" to="/dashboard">
          Go Back
        </Link>
      </form>
    </div>
  );
};

CreateProfile.propTypes = {
    createProfile: PropTypes.func.isRequired
};

export default connect(null , { createProfile })(withRouter(CreateProfile));
