const router = require("express").Router();
const passport = require("passport");

const {
  googleCallback,
  index,
  logout,
  verifyUser,
  authCheck,
} = require("../lib/index");
const { generateToken, sendToken } = require("../helpers/token");

// Index route to the index page.
router.get("/", authCheck, index);

router.route("/auth/google/token").post(
  passport.authenticate("google-token", { session: false }),
  (req, res, next) => {
    if (!req.user) {
      return res.status(401).send("User Not Authenticated");
    }
    req.auth = {
      id: req.user.id,
    };

    next();
  },
  generateToken,
  sendToken
);

router.post("/verify/user", verifyUser);

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

module.exports = router;
