import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getProfileByID } from "../../actions/profile";
import Spinner from "../layout/Spinner";
import { Link } from "react-router-dom";
import ProfileExperience from "./ProfileExperience";
import ProfileEducation from "./ProfileEducation";
import ProfileGithub from "./ProfileGithub";
import ProfileListItem from "../profiles/ProfileListItem";
import style from "../profiles/Profiles.module.scss";

const Profile = ({
  match,
  getProfileByID,
  profile: { profile, loading },
  auth,
}) => {
  useEffect(() => {
    getProfileByID(match.params.id);
  }, [getProfileByID, match.params.id]);
  return (
    <div className={style.bg}>
      {profile === null || loading ? (
        <Spinner />
      ) : (
        <div className="container">
          <div className="row">
            <div className="col-12 pt-3">
              <Link to="/profiles" className="btn btn-primary btn-lg px-4">
                Back
              </Link>
            </div>
          </div>
          <div className="row">
            <div className="col-md-4">
              <ProfileListItem profile={profile} col={12} />
              <div className="col-md-12 card card-body bg-light">
                <h2 className="text-primary text-center">Education</h2>

                {profile.education.length > 0 ? (
                  <div className="list-group">
                    {profile.education.map((edu) => (
                      <ProfileEducation key={edu._id} education={edu} />
                    ))}
                  </div>
                ) : (
                  <h4>No education credientials</h4>
                )}
              </div>
              {auth.isAuthenticated &&
                auth.loading === false &&
                auth.user._id === profile.user._id && (
                  <Link to="/edit-profile" className="btn btn-dark">
                    Edit Profile
                  </Link>
                )}
            </div>
            <div className="col-md-8">
              <div className="row">
                <div className="col-md-12 card card-body bg-light">
                  <h2 className="text-primary text-center">Experience</h2>

                  {profile.experience.length > 0 ? (
                    <div className="list-group">
                      {profile.experience.map((exp) => (
                        <ProfileExperience key={exp._id} experience={exp} />
                      ))}
                    </div>
                  ) : (
                    <h4>No experience credientials</h4>
                  )}
                </div>
                {profile.githubusername && (
                  <div className="col-md-12 card card-body bg-light my-3">
                    <ProfileGithub username={profile.githubusername} />
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

Profile.propTypes = {
  getProfileByID: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  profile: state.profile,
  auth: state.auth,
});

export default connect(mapStateToProps, { getProfileByID })(Profile);
