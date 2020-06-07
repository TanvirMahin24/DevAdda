const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");

//Model
const Post = require("../../models/Post");
const User = require("../../models/User");
const Profile = require("../../models/Profile");

//Custom middleware
const auth = require("../../middleware/auth");

//@route POST api/posts
//@desc Create a post
//@access Private
router.post(
  "/",
  [auth, [check("text", "Text is required").not().isEmpty()]],
  async (req, res) => {
    //Validation error handeling
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      //fetxh the user for the name and avatar field
      const user = await User.findById(req.user.id).select("-password");

      //create post
      const newPost = new Post({
        text: req.body.text,
        name: user.name,
        avatar: user.avatar,
        user: req.user.id,
      });

      //final post
      const post = await newPost.save();

      //response
      res.json(post);
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Server Error");
    }
  }
);

//@route GET api/posts
//@desc Get all post
//@access Private
router.get("/", auth, async (req, res) => {
  try {
    //fetch all posts
    const posts = await Post.find().sort({ date: -1 });

    //response
    res.json(posts);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
});

//@route GET api/posts/:postId
//@desc Get post by id
//@access Private
router.get("/:postId", auth, async (req, res) => {
  try {
    //fetch post by id
    const post = await Post.findById(req.params.postId);
    if (!post) {
      return res.status(404).json({ msg: "Post not found" });
    }

    //response
    res.json(post);
  } catch (error) {
    console.error(error.message);
    if (error.kind === "ObjectId") {
      return res.status(404).json({ msg: "Post not found" });
    }
    res.status(500).send("Server Error");
  }
});

//@route DELETE api/posts/:id
//@desc Delete a post
//@access Private
router.delete("/:id", auth, async (req, res) => {
  try {
    //fetch the post
    const post = await Post.findById(req.params.id);

    //If there is no post to delete
    if (!post) {
      return res.status(404).json({ msg: "Post not found" });
    }

    //Check if the user owns the post
    if (post.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: "User not authorized" });
    }

    //Remove the post
    await post.remove();

    //response
    res.json({ msg: "Post removed" });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
});

//@route PUT api/posts/like/:id
//@desc Like a post
//@access Private
router.put("/like/:id", auth, async (req, res) => {
  try {
    //fetch the post
    const post = await Post.findById(req.params.id);

    //Check if this user already liked
    if (
      post.likes.filter((like) => like.user.toString() === req.user.id).length >
      0
    ) {
      return res.status(400).json({ msg: "Post already liked" });
    }

    //If user did't like the post then add like
    post.likes.unshift({ user: req.user.id });

    //save post
    await post.save();

    //response
    res.json(post.likes);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
});

//@route PUT api/posts/unlike/:id
//@desc unlike a post
//@access Private
router.put("/unlike/:id", auth, async (req, res) => {
  try {
    //fetch the post
    const post = await Post.findById(req.params.id);

    //Check if this user already liked
    if (
      post.likes.filter((like) => like.user.toString() === req.user.id)
        .length === 0
    ) {
      return res.status(400).json({ msg: "Post has not been liked" });
    }

    //get like index to remove
    const removeIndex = post.likes
      .map((like) => like.user.toString())
      .indexOf(req.user.id);

    //Unlike the post
    post.likes.splice(removeIndex, 1);

    //save post
    await post.save();

    //response
    res.json(post.likes);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
});

//@route POST api/posts/comment
//@desc Comment on post
//@access Private
router.post(
  "/comment/:cmntId",
  [auth, [check("text", "Text is required").not().isEmpty()]],
  async (req, res) => {
    //Validation error handeling
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      //fetch the user for the name and avatar field also fetch the post to cmment
      const user = await User.findById(req.user.id).select("-password");
      const post = await Post.findById(req.params.cmntId);

      //create the commen object
      const newCmnt = {
        text: req.body.text,
        name: user.name,
        avatar: user.avatar,
        user: req.user.id,
      };

      //Add comment to the post
      post.comments.unshift(newCmnt);

      //Save the psot with comments
      await post.save();

      //response
      res.json(post.comments);
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Server Error");
    }
  }
);

//@route DELETE api/posts/comment/:postId/:cmntId
//@desc Delete a comment from post
//@access Private
router.delete("/comment/:postId/:cmntId", auth, async (req, res) => {
  try {
    //fetch the post
    const post = await Post.findById(req.params.postId);

    //Pullout all comments and find the comment to delete
    const comment = post.comments.find(
      (comment) => comment.id === req.params.cmntId
    );

    //Check if the comment exist
    if (!comment) {
      return res.status(404).json({ msg: "Comment does not exist" });
    }

    //Check if the user is the owner of the comment
    if (comment.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: "Unauthorized action" });
    }

    //get comment index to remove
    const removeIndex = post.comments
      .map((comment) => comment.user.toString())
      .indexOf(req.user.id);

    //Delete the comment
    post.comments.splice(removeIndex, 1);

    //save post
    await post.save();

    //response
    res.json(post.comments);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
