exports.createPostValidator = (req, res, next) => {
  req.check('title', 'write a title').notEmpty();
  req.check('title', 'title must be between 4 and 150').isLength({
    min: 4,
    max: 150,
  });
  //body

  req.check('body', 'write a body').notEmpty();
  req.check('body', 'body must be between 4 and 2000').isLength({
    min: 4,
    max: 2000,
  });
  //check for errors
  const errors = req.validationErrors();
  if (errors) {
    const firstError = errors.map((error) => error.msg)[0];
    return res.status(400).json({ error: firstError });
  }
  //proced to next middle ware
  next();
};

exports.usersignupValidator = (req, res, next) => {
  //name is not null and between 4 to 10characters
  req.check('name', 'Name is Required').notEmpty();

  //check for emails
  req
    .check('email', 'email must be between 3 and 32 characters')
    .matches(/.+\@.+\..+/)
    .withMessage('Email must conatsin @')
    .isLength({
      min: 4,
      max: 2000,
    });

  //check for password
  req.check('password', 'Password is Required').notEmpty();
  req
    .check('password')
    .isLength({ min: 6 })
    .withMessage('Password must be at least 6 characters')
    .matches(/\d/)
    .withMessage('Password must contain a number');

  //check for errors
  const errors = req.validationErrors();
  if (errors) {
    const firstError = errors.map((error) => error.msg)[0];
    return res.status(400).json({ error: firstError });
  }
  //proced to next middle ware
  next();
};
