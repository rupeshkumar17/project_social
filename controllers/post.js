const Post = require("../models/post");

exports.getPosts = (req, res) => {
  res.json({
    posts: [{ title: "first post" }, { title: "second  post" }],
  });
};

exports.createPost = (req, res) => {
  const post = new Post(req.body);
  //   console.log("createPost is done", req.body);
  //   post.save((err, result) => {
  // //
  post.save().then((result) => {
    res.status(200).json({ post: result });
  });
};
