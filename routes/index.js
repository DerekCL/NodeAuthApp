const router = require("express").Router();
const passport = require("passport");
const authCheck = require("../lib/authCheck");

const { googleCallback, index, logout, profile } = require("../lib/index");
// Index route to the index page.
router.get("/", index);

/**
 * Scopes of the authentication.
 * Note: change to proper scopes later as multiple scopes appeared to not work
 * properly.
 **/
router.get(
  "/google",
  passport.authenticate("google", {
    scope: ["profile"],
  })
);

// auth logout
router.get("/logout", logout);

/**
 * Google route that authenticates the user in our system.
 * Calls back here and handles the redirection.
 **/
router.get("/callback/google", passport.authenticate("google"), googleCallback);

router.get("/profile", authCheck, profile);

module.exports = router;
