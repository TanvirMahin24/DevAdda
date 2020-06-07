import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getGithubRepos } from "../../actions/profile";
import Spinner from "../layout/Spinner";
const ProfileGithub = ({ username, getGithubRepos, repos }) => {
  useEffect(() => {
    getGithubRepos(username);
  }, [getGithubRepos, username]);
  return (
    <div className="list-group">
      <h2 className="text-primary my-1">
        <i className="fab fa-github"></i> Github Repos
      </h2>
      {repos.length === 0 ? (
        <Spinner />
      ) : (
        repos.map((repo, index) => (
          <div key={index} className="list-group-item bg-white p-1 my-1">
            <div className="row">
              <div className="col-9">
                <h4>
                  <a
                    href={repo.html_url}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {repo.name}
                  </a>{" "}
                </h4>
                <span className="pr-3">
                  <strong>- Created:</strong> {repo.created_at.split("T")[0]}
                </span>
                <span className="">
                  <strong>- Updated:</strong> {repo.updated_at.split("T")[0]}
                </span>
                <span className="d-block pt-3">
                  <strong>Description:</strong>
                  <br />
                  {repo.description === null
                    ? "No description given for this repository"
                    : repo.description}
                </span>
              </div>
              <div className="col-3 p-3">
                <ul>
                  <li className="badge badge-primary d-block my-2">
                    Stars: {repo.stargazers_count}
                  </li>
                  <li className="badge badge-dark d-block my-2">
                    Watchers: {repo.watchers_count}
                  </li>
                  <li className="badge badge-success d-block my-2">
                    Forks: {repo.forks_count}
                  </li>
                </ul>
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

ProfileGithub.propTypes = {
  getGithubRepos: PropTypes.func.isRequired,
  username: PropTypes.string.isRequired,
  repos: PropTypes.array.isRequired,
};

const mapStateToProps = (state) => ({
  repos: state.profile.repos,
});

export default connect(mapStateToProps, { getGithubRepos })(ProfileGithub);
