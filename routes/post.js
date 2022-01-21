const { getPosts, createPost } = require("../controllers/post");
const express = require("express");
const { requireSignin } = require("../controllers/auth");
const { createPostValidator } = require("../validators/index");
const { userById } = require("../controllers/user");

const router = express.Router();

router.get("/", getPosts);
router.post("/post", requireSignin, createPostValidator, createPost);

//any route containing user id aur app will excute user id
router.param("userId", userById);

module.exports = router;
