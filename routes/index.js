const express = require("express");
const router = express.Router();
const passport = require("passport");

const { indexRoute, profileRoute } = require("../lib/index");
// Index route to the index page.
router.get("/", indexRoute);

router.get(
  "/profile",
  passport.authenticate("bearer", { session: false }),
  profileRoute
);

module.exports = router;
