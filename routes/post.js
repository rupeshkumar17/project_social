const {
  getPosts,
  createPost,
  postByUser,
  postById,
  isPoster,
  deletePost,
  updatePost,
} = require('../controllers/post');
const express = require('express');
const { requireSignin } = require('../controllers/auth');
const { createPostValidator } = require('../validators/index');
const { userById } = require('../controllers/user');

const router = express.Router();

router.get('/', getPosts);
router.post(
  '/post/new/:userId',
  requireSignin,
  createPost,
  createPostValidator
);
router.get('/posts/by/:userId', requireSignin, postByUser);
router.put('/post/:postId', requireSignin, isPoster, updatePost);
router.delete('/post/:postId', requireSignin, isPoster, deletePost);

//any route containing userId aur app will excute user id
router.param('userId', userById);
//any route containing postId aur app will excute user id
router.param('postId', postById);

module.exports = router;
