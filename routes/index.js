const express = require("express");
const router = express.Router();
const passport = require("passport");

const { indexRoute } = require("../lib/index");
// Index route to the index page.
router.get("/", indexRoute);

/** Scopes of the authentication. Note: change to proper scopes later as multiple scopes appeared to not work properly. */
router.get(
  "/google",
  passport.authenticate("google", {
    scope: ["profile"],
  })
);

/** Google route that authenticates the user in our system. Calls back here and handles the redirection. */
router.get("/callback/google", passport.authenticate("google"), (req, res) => {
  res.send(req.user);
});

module.exports = router;
