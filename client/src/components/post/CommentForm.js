import React, { useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { addComment } from "../../actions/Post";

function CommentForm({ postId, addComment }) {
  const [text, setText] = useState("");
  return (
    <div className="post-form">
      <div className="pt-3 text-light">
        <h2 className="">Leave a comment...</h2>
      </div>
      <form
        className="form my-1"
        onSubmit={(e) => {
          e.preventDefault();
          addComment(postId, { text });
          setText("");
        }}
      >
        <textarea
          name="text"
          className="form-control"
          value={text}
          rows="6"
          onChange={(e) => setText(e.target.value)}
          placeholder="Comment on this post"
          required
        ></textarea>
        <input type="submit" className="btn btn-primary my-1" value="Submit" />
      </form>
    </div>
  );
}

CommentForm.propTypes = {
  addComment: PropTypes.func.isRequired,
};

export default connect(null, { addComment })(CommentForm);
