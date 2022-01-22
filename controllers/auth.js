const jwt = require("jsonwebtoken");
const expressJwt = require("express-jwt");
require("dotenv").config();

const User = require("../models/user");
exports.signup = async (req, res) => {
  const userExists = await User.findOne({ email: req.body.email });
  if (userExists) {
    return res.status(403).json({ error: "Email is taken!" });
  }
  const user = await new User(req.body);
  await user.save();
  res.status(200).json({ message: "signup success please login " });
};

exports.signin = (req, res) => {
  //find the user bases on email
  const { email, password } = req.body;
  User.findOne({ email }, (err, user) => {
    if (err || !user) {
      return res
        .status(401)
        .json({ error: "user with email doesnot exist please signin" });
    }
    //if user is already there make sure email and password match
    //create authenticate method in model and use here
    if (!user.authenticate(password)) {
      return res.status(401).json({ error: "email and password don't match" });
    }
    //generate a takoen with user id and secret
    const token = jwt.sign({ _id: user.id }, process.env.JWT_SECRET);
    //persist the toekn as "t in cookie with expiry date"
    res.cookie("t", token, { expire: new Date() + 9999 });

    //return response with user and token to fronted clent
    const { _id, name, email } = user;
    return res.json({ token, user: { _id, name, email } });
  });
};

exports.signout = (req, res) => {
  res.clearCookie("t");
  return res.json({ message: "Sign out success" });
};

exports.requireSignin = expressJwt({
  //if the token is valid,jwt appends the verified users id 
  //in an auth key t o the request object
  secret: process.env.JWT_SECRET,
  algorithms: ["sha1", "RS256", "HS256"],
  userProperty:"auth"
});
