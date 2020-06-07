import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import Moment from "react-moment";
import { deleteComment } from "../../actions/Post";

const CommentItem = ({
  postId,
  comment: { _id, name, text, avatar, user, date },
  auth,
  deleteComment,
}) => {
  return (
    <div className="list-group-item mb-3">
      <div class="row bg-white p-2 m-2">
        <div className="col-md-3 text-center">
          <Link to={`/porfile/${user}`}>
            <img class="rounded-circle w-50" src={avatar} alt="avatar" />
            <h4>{name}</h4>
          </Link>
          <p class="post-date">
            Posted on <Moment format="DD/MM/YYYY">{date}</Moment>
          </p>
          {!auth.loading && user === auth.user._id && (
            <button
              onClick={(e) => deleteComment(postId, _id)}
              type="button"
              className="btn btn-danger"
            >
              <i className="fas fa-trash"></i>&nbsp;
            </button>
          )}
        </div>
        <div className="col-md-9 text-center">
          <p class="my-1 h4 ">{text}</p>
        </div>
      </div>
    </div>
  );
};

CommentItem.propTypes = {
  postId: PropTypes.number.isRequired,
  comment: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  deleteComment: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { deleteComment })(CommentItem);
