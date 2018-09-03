const authCheck = (req, res, next) => {
  if (!req.user) {
    return next(new Error("User Not Logged In"));
  } else {
    next();
  }
};

module.exports = authCheck;
