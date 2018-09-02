"use strict";

/*
 * This file is for the passport "strategies" and all their configurations.
 */

// INITIALIZATION

const BearerStrategy = require("passport-http-bearer").Strategy;
const db = require("../db");

/**
 * This is the module that exports all the passport strategies.
 *
 * In order to support login sessions, Passport will serialize and deserialize user instances to and from the session.
 *
 *     serializeUser - determines which data of the user object should be stored in the current session
 *     deserializeUser - returns the user profile based on the identifying information that was serialized to the session.
 *
 * @param {any} passport
 */

function passportConfig(passport) {
  passport.serializeUser((user, done) => {
    done(null, user.account_email);
  });
  passport.deserializeUser((user, done) => {
    return db.users
      .findOne(user)
      .then(data => done(null, data))
      .catch(error => done(error));
  });

  // The Bearer strategy requires a `verify` function which receives the
  // credentials (`token`) contained in the request.  The function must invoke
  // `cb` with a user object, which will be set at `req.user` in route handlers
  // after authentication.

  passport.use(
    new BearerStrategy((token, cb) => {
      db.users.findByToken(token, function(err, user) {
        if (err) {
          return cb(err);
        }
        if (!user) {
          return cb(null, false);
        }
        return cb(null, user);
      });
    })
  );
}

module.exports = passportConfig;
