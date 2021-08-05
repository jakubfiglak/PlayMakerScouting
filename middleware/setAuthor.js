function setAuthor(req, res, next) {
  req.body.author = req.user._id;
  next();
}

module.exports = setAuthor;
