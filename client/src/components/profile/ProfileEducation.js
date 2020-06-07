import React from "react";
import PropTypes from "prop-types";
import Moment from "react-moment";

const ProfileEducation = ({
  education: { school, degree, fieldofstudy, current, to, from, description },
}) => {
  return (
    <div className="list-group-item">
      <h3 className="text-dark">{school}</h3>
      <span className="d-block">
        <Moment format="DD/MM/YYYY">{from}</Moment> -{" "}
        {!to ? "Now" : <Moment format="DD/MM/YYYY">{to}</Moment>}
      </span>
      <span className="d-block">
        <strong>Degree: </strong>
        {degree}
      </span>
      <span className="d-block">
        <strong>Field of Study: </strong>
        {fieldofstudy === "" ? <span>N/A</span> : fieldofstudy}
      </span>
    </div>
  );
};

ProfileEducation.propTypes = {
  education: PropTypes.object.isRequired,
};

export default ProfileEducation;
