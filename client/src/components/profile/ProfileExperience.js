import React from "react";
import PropTypes from "prop-types";
import Moment from "react-moment";

const ProfileExperience = ({
  experience: { company, title, location, current, to, from, description },
}) => {
  return (
    <div className="list-group-item d-block">
      <span className="text-dark h3">
        {company}{" "}
        <span className="h6 text-secondary">
          (<Moment format="DD/MM/YYYY">{from}</Moment> -{" "}
          {!to ? "Now" : <Moment format="DD/MM/YYYY">{to}</Moment>})
        </span>
      </span>
      <span className="d-block">
        <strong>Position: </strong>
        {title}
      </span>
      <p>
        <strong>Description: </strong>
        {description === "" ? <span>N/A</span> : description}
      </p>
    </div>
  );
};

ProfileExperience.propTypes = {
  experience: PropTypes.object.isRequired,
};

export default ProfileExperience;
