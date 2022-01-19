const express = require("express");

const app = express();
const postRoutes = require("./routes/post");

// app.get("/", (req, res) => {
//   res.send("hello world from node js");
// });
app.get("/", postRoutes.getPosts);
const port = 8080;
app.listen(port, () => {
  console.log(`NODE JS API IS LISTENING: ${port}`);
});
