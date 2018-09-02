const db = require("../db");

function indexRoute(req, res, next) {
  db.users
    .drop()
    .then(data => {
      res.status(200).json({
        status: "success",
        data: data,
        query_info: "drop table candidate_info",
      });
    })
    .catch(err => {
      return next(err);
    });
}

module.exports = { indexRoute };
