import React, { useEffect, Fragment } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Spinner from "../layout/Spinner";
import PostItem from "../posts/PostItem";
import { getPost } from "../../actions/Post";
import { Link } from "react-router-dom";
import CommentForm from "./CommentForm";
import CommentItem from "./CommentItem";

const Post = ({ getPost, post: { post, loading }, match }) => {
  useEffect(() => {
    getPost(match.params.id);
  }, [getPost, match.params.id]);

  return loading || post === null ? (
    <Spinner />
  ) : (
    <div className="bgCustom">
      <div className="container">
        <Link to="/posts" className="btn btn-primary my-3">
          <i className="fas fa-arrow-left"></i> Go Back
        </Link>
        <PostItem post={post} showActions={false} />
        <CommentForm postId={post._id} />
        <h3 className="text-center text-light pb-3">Comments</h3>
        <div className="list-group ">
          {post.comments.map((comment) => (
            <CommentItem
              key={comment._id}
              comment={comment}
              postId={post._id}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

Post.propTypes = {
  getPost: PropTypes.func.isRequired,
  post: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  post: state.post,
});

export default connect(mapStateToProps, { getPost })(Post);
