import React, { useEffect, Fragment } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getProfiles } from "../../actions/profile";
import Spinner from "../layout/Spinner";
import ProfileListItem from "./ProfileListItem";
import style from "./Profiles.module.scss";

const Profiles = ({ getProfiles, profile: { profiles, loading } }) => {
  useEffect(() => {
    getProfiles();
  }, [getProfiles]);
  return (
    <div className={style.bg}>
      <div className="container text-center ">
        {loading ? (
          <Spinner />
        ) : (
          <Fragment>
            <h2 className="text-light text-center pt-3">
              All DevAdda Members:
            </h2>
            <p className="lead text-light  text-center">
              <i className="fas fa-users pr-3"></i> Browse and get connected
              with the people just like you
            </p>
            <div className="row">
              <div className="card-deck col-12">
                {profiles.length > 0 ? (
                  profiles.map((profile) => (
                    <ProfileListItem
                      key={profile._id}
                      profile={profile}
                      col={4}
                    />
                  ))
                ) : (
                  <h4 className="text-light  text-center">
                    No profiles found...
                  </h4>
                )}
              </div>
            </div>
          </Fragment>
        )}
      </div>
    </div>
  );
};

Profiles.propTypes = {
  getProfiles: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  profile: state.profile,
});

export default connect(mapStateToProps, { getProfiles })(Profiles);
