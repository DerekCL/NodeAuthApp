const db = require("../db");

function indexRoute(req, res, next) {
  db.users
    .create()
    .then(data => {
      res.status(200).json({
        status: "success",
        data: data,
        query_info: "create table candidate_info",
      });
    })
    .catch(err => {
      return next(err);
    });
}

function profileRoute(req, res, next) {
  res.json({ username: req.user.username, email: req.user.emails[0].value });
}

module.exports = { indexRoute, profileRoute };
