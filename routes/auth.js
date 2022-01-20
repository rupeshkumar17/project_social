
const { signup,signin,signout} = require("../controllers/auth");
const express = require("express");
const { usersignupValidator } = require("../validators/index");

const router = express.Router();


router.post("/signup", usersignupValidator, signup);
router.post("/signin", signin);
router.get("/signout", signout);

module.exports = router;