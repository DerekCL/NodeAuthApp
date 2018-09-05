const db = require("../db");

function index(req, res) {
  res.status(200).send(req.user);
}

function logout(req, res) {
  req.logout();
  res.json({
    status: "success",
    request_info: "signed out",
    signed_in: false,
  });
}

function googleCallback(req, res) {
  res.json({
    status: "success",
    request_info: "signed in",
    user: req.user,
    signed_in: false,
  });
}

function verifyUser(req, res, next) {
  return db.users
    .findByGoogleToken({ google_access_token: req.body.google_access_token })
    .then(currentUser => {
      if (currentUser) {
        // already have this user
        res.json({
          status: "success",
          request_info: "user validation",
          google_access_token: req.body.google_access_token,
        });
      } else {
        res.json({
          status: "failure",
          request_info: "user validation",
          google_access_token: req.body.google_access_token,
        });
      }
    })
    .catch(err => next(new Error(err)));
}

function authCheck(req, res, next) {
  if (!req.user) {
    return next(new Error("User Not Logged In"));
  } else {
    next();
  }
}

module.exports = { index, logout, googleCallback, authCheck, verifyUser };
