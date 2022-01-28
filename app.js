const express = require('express');
const app = express();
const morgan = require('morgan');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
const expressValidator = require('express-validator');
const fs = require('fs');
const cors = require('cors');

const mongoose = require('mongoose');
dotenv.config();
//db
mongoose
  .connect(process.env.MONGO_URI, { usenewUrlParser: true })
  .then(() => console.log('DB Connected'));
mongoose.connection.on('error', (err) =>
  console.log(`db connection error ${err.messagee}`)
);

const postRoutes = require('./routes/post');
const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/user');

//apiDocs
app.get('/', (req, res) => {
  fs.readFile('docs/apiDocs.json', (err, data) => {
    if (err) {
      res.status(400).json({ error: err });
    }
    const docs = JSON.parse(data);
    res.json(docs);
  });
});

// const myownMiddleware = (req, res, next) => {
//   console.log('middleware is applied');
//   next();
// };
//middleware
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(expressValidator());
app.use(cors());
app.use('/', postRoutes);

app.use('/', authRoutes);

app.use('/', userRoutes);

app.use(function (err, req, res, next) {
  if (err.name === 'UnauthorizedError') {
    res.status(401).json({ error: 'unathorized person!' });
  }
});
const port = process.env.PORT || 8080;

app.listen(port, () => {
  console.log(`NODE JS API IS LISTENING: ${port}`);
});
