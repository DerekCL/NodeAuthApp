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
    signed_in: false,
  });
}

module.exports = { index, logout, googleCallback };
