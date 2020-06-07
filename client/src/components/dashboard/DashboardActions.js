import React from "react";
import { Link } from "react-router-dom";

const DashboardActions = () => {
  return (
    <div className="">
      <Link to="/edit-profile" className="btn btn-primary m-2 ml-0">
        <i className="fas fa-user-circle "></i> Edit Profile
      </Link>
      <Link to="/add-experience" className="btn btn-info m-2">
        <i className="fab fa-black-tie "></i> Add Experience
      </Link>
      <Link to="/add-education" className="btn btn-info m-2">
        <i className="fas fa-graduation-cap"></i> Add Education
      </Link>
    </div>
  );
};

export default DashboardActions;
