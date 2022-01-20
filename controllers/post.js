const Post = require("../models/post");

exports.getPosts = (req, res) => {
  //   res.json({
  //     posts: [{ title: "first post" }, { title: "second  post" }],
  //   });
  const posts = Post.find().select("_id title body ")
    .then((posts) => {
      res.json({ posts });
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.createPost = (req, res) => {
  const post = new Post(req.body);
  //   console.log("createPost is done", req.body);
  //   post.save((err, result) => {
  // //
  post.save().then((result) => {
    res.json({ post: result });
  });
};
