exports.createPostValidator = (req, res, next) => {
  req.check("title", "write a title").notEmpty();
  req.check("title", "title must be between 4 and 150").isLength({
    min: 4,
    max: 150,
  });
  //body

  req.check("body", "write a body").notEmpty();
  req.check("body", "body must be between 4 and 2000").isLength({
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
