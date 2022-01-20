const express = require("express");
const app = express();
const morgan = require("morgan");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
dotenv.config();
//db
mongoose.connect(process.env.MONGO_URI).then(() => console.log("DB connected"));
mongoose.connection.on("error", (err) =>
  console.log(`db connection error ${err.messagee}`)
);

const postRoutes = require("./routes/post");

const myownMiddleware = (req, res, next) => {
  console.log("middleware is applied");
  next();
};
//middleware
app.use(morgan("dev"));
// app.use(myownMiddleware)
app.use("/", postRoutes);
const port = process.env.PORT || 8080;
app.listen(port, () => {
  console.log(`NODE JS API IS LISTENING: ${port}`);
});
