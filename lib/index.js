const db = require("../db");

function index(req, res) {
  res.send(req.user);
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

function authCheck(req, res, next) {
  if (!req.user) {
    return next(new Error("User Not Logged In"));
  } else {
    next();
  }
}

module.exports = { index, logout, googleCallback, authCheck };
