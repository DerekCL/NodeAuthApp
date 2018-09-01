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

module.exports = indexRoute;
