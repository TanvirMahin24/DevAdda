import React, { Fragment } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

function ProfileListItem({
  profile: {
    user: { _id, name, avatar },
    company,
    status,
    location,
    skills,
    bio,
    social,
    website,
  },
  col = 4,
}) {
  return (
    <div
      className={`col-md-${col} card bg-light mb-4 text-center shadow shadow-sm mt-3`}
    >
      <div class="card-img-top">
        <img src={avatar} alt="profile" class="img-fluid rounded-circle" />
      </div>
      <div class="card-body">
        <h4 class="card-title">
          <strong>{name}</strong>
        </h4>
        <p class="h6">
          <i class="fas fa-briefcase"></i> {status}
          <strong>{company && <span> at {company}</span>}</strong>
        </p>
        <p class="h6">
          <i class="fas fa-map-marker-alt"></i> {location}
        </p>
        {col === 12 && (
          <Fragment>
            <div className="icons my-1">
              {website && (
                <a
                  href={website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-dark"
                >
                  <i className="fas fa-globe fa-2x p-2"></i>
                </a>
              )}
              {social && social.twitter && (
                <a
                  href={social.twitter}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-dark"
                >
                  <i className="fab fa-twitter fa-2x p-2"></i>
                </a>
              )}
              {social && social.facebook && (
                <a
                  href={social.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-dark"
                >
                  <i className="fab fa-facebook fa-2x p-2"></i>
                </a>
              )}
              {social && social.linkedin && (
                <a
                  href={social.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-dark"
                >
                  <i className="fab fa-linkedin fa-2x p-2"></i>
                </a>
              )}
              {social && social.youtube && (
                <a
                  href={social.youtube}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-dark"
                >
                  <i className="fab fa-youtube fa-2x p-2"></i>
                </a>
              )}
              {social && social.instagram && (
                <a
                  href={social.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-dark"
                >
                  <i className="fab fa-instagram fa-2x p-2"></i>
                </a>
              )}
            </div>
          </Fragment>
        )}
        <div class="text-light d-flex justify-content-center mt-2">
          {skills.slice(0, 4).map((skill, index) => (
            <p key={index} className="text-primary list-none p-2">
              <i className="fas fa-check"></i>
              {" " + skill}
            </p>
          ))}
        </div>
        <p class="card-text mt-1">{bio}</p>
      </div>
      <div className="card-footer text-center">
        <Link to={`/profile/${_id}`} className="btn btn-primary px-3">
          <i class="fas fa-user mr-2"></i>View Profile
        </Link>
      </div>
    </div>
  );
}

ProfileListItem.propTypes = {
  profile: PropTypes.object.isRequired,
  col: PropTypes.number.isRequired,
};

export default ProfileListItem;
