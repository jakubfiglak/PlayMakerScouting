function setAuthor(req, res, next) {
  req.body.author = req.user._id;
  req.body.createdByUserWithRole = req.user.role;
  next();
}

module.exports = setAuthor;
