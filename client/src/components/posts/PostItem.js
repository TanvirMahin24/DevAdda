import React, { Fragment } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Moment from "react-moment";
import { Link } from "react-router-dom";
import { addLike, removeLike, deletePost } from "../../actions/Post";

const PostItem = ({
  post: { _id, text, name, avatar, user, likes, comments, date },
  auth,
  addLike,
  removeLike,
  deletePost,
  showActions,
}) => {
  return (
    <div className="list-group-item mb-4">
      <div className="card card-body">
        <div className="row">
          <div className="col-md-2 text-center">
            <Link to={`/profile/${user}`}>
              <img
                className="rounded-circle w-50"
                src={avatar}
                alt="Post author"
              />
              <h4 className="pt-3">{name}</h4>
            </Link>
            <p className="text-center font-weight-bold">
              Posted on <Moment format="DD/MM/YYYY">{date}</Moment>
            </p>
          </div>
          <div className="col-md-10">
            <p className="py-1 h4">
              {showActions
                ? text.slice(0, 400) + (text.length > 400 ? "..." : "")
                : text}
            </p>
          </div>
        </div>
      </div>
      <div className="pt-2">
        {showActions && (
          <Fragment>
            <div className="row">
              <div className="col-6 text-left">
                <button
                  onClick={(e) => addLike(_id)}
                  type="button"
                  className="btn btn-light"
                >
                  <i className="fas fa-thumbs-up"></i>{" "}
                  <span>{likes.length > 0 && <span>{likes.length}</span>}</span>
                </button>
                <button
                  onClick={(e) => removeLike(_id)}
                  type="button"
                  className="btn btn-light"
                >
                  <i className="fas fa-thumbs-down"></i>
                </button>
              </div>
              <div className="col-6 text-right">
                <Link to={`/posts/${_id}`} className="btn btn-primary">
                  Discussion{" "}
                  {comments.length > 0 && (
                    <span class="badge badge-pill badge-light">
                      {comments.length}
                    </span>
                  )}
                </Link>
                {!auth.loading && user === auth.user._id && (
                  <button
                    onClick={(e) => deletePost(_id)}
                    type="button"
                    className="btn btn-danger mx-4"
                  >
                    <i className="fas fa-trash-alt"></i>
                  </button>
                )}
              </div>
            </div>
          </Fragment>
        )}
      </div>
    </div>
  );
};

PostItem.defaultProps = {
  showActions: true,
};

PostItem.propTypes = {
  post: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  addLike: PropTypes.func.isRequired,
  removeLike: PropTypes.func.isRequired,
  deletePost: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});
export default connect(mapStateToProps, { addLike, removeLike, deletePost })(
  PostItem
);
