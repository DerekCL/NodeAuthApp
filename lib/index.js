const db = require("../db");

function indexRoute(req, res, next) {
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

module.exports = { indexRoute };
