const {getPosts,createPost} = require("../controllers/post")
const express = require("express")
const { createPostValidator } = require("../validators/index");

const router = express.Router()


router.get("/", getPosts);
router.post("/post",createPostValidator, createPost);

module.exports =router
 