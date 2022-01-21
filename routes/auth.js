
const { signup,signin,signout} = require("../controllers/auth");
const { userById} = require("../controllers/user");
const express = require("express");
const { usersignupValidator } = require("../validators/index");

const router = express.Router();


router.post("/signup", usersignupValidator, signup);
router.post("/signin", signin);
router.get("/signout", signout);

//any route containing user id aur app will excute user id 
router.param("userId",userById)

module.exports = router;