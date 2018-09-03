const db = require("../db");

function index(req, res, next) {
  db.users
    .empty()
    .then(data => {
      res.status(200).json({
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
  res.send("logged out");
}

function googleCallback(req, res) {
  res.send("logged in");
}

function profile(req, res) {
  res.send(req.user);
}

module.exports = { index, logout, googleCallback, profile };
