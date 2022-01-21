const express = require("express");
const app = express();
const morgan = require("morgan");
const dotenv = require("dotenv");
const bodyParser = require("body-parser");
var cookieParser = require("cookie-parser");
const expressValidator = require("express-validator");

const mongoose = require("mongoose");
dotenv.config();
//db
mongoose
  .connect(process.env.MONGO_URI, { usenewUrlParser: true })
  .then(() => console.log("DB Connected"));
mongoose.connection.on("error", (err) =>
  console.log(`db connection error ${err.messagee}`)
);

const postRoutes = require("./routes/post");
const authRoutes = require("./routes/auth");

const myownMiddleware = (req, res, next) => {
  console.log("middleware is applied");
  next();
};
//middleware
app.use(morgan("dev"));
// app.use(myownMiddleware)
app.use(bodyParser.json());
app.use(cookieParser());
app.use(expressValidator());
app.use("/", postRoutes);
app.use("/", authRoutes);
app.use(function (err, req, res, next) {
  if (err.name === "UnauthorizedError") {
    res.status(401).json({ error :"unathorized person!"});
  }
});
const port = process.env.PORT || 8080;

app.listen(port, () => {
  console.log(`NODE JS API IS LISTENING: ${port}`);
});
