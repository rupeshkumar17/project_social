const express = require("express");
const app = express();
const morgan = require("morgan");

const { getPosts } = require("./routes/post");
//bring in routes

// app.get("/", (req, res) => {
//   res.send("hello world from node js");
// });
const myownMiddleware = (req,res,next) => {
  console.log("middleware is applied");
  next();
}
//middleware
app.use(morgan("dev"));
app.use(myownMiddleware)
app.get("/", getPosts);
const port = 8080;
app.listen(port, () => {
  console.log(`NODE JS API IS LISTENING: ${port}`);
});
