import React, { useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { addPost } from "../../actions/Post";

const PostForm = ({ addPost }) => {
  const [text, setText] = useState("");
  return (
    <div className="container pt-4 px-4 pb-0">
      <div className="font-weight-lighter">
        <h3 className="text-light">Say Something...</h3>
      </div>
      <form
        className=" my-1"
        onSubmit={(e) => {
          e.preventDefault();
          addPost({ text });
          setText("");
        }}
      >
        <textarea
          className="form-control"
          name="text"
          cols="30"
          rows="5"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Create a post"
          required
        ></textarea>
        <input
          type="submit"
          className="btn btn-outline-light my-1"
          value="Create Post"
        />
      </form>
    </div>
  );
};

PostForm.propTypes = {
  addPost: PropTypes.func.isRequired,
};

export default connect(null, { addPost })(PostForm);
