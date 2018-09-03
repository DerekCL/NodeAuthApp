const db = require("../db");

function index(req, res, next) {
  db.users
    .empty()
    .then(data => {
      res.json({
        status: "success",
        data: data,
        query_info: "empty table candidate_info",
      });
    })
    .catch(err => {
      return next(err);
    });
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
    signed_in: false,
  });
}

function profile(req, res) {
  res.send(req.user);
}

module.exports = { index, logout, googleCallback, profile };
