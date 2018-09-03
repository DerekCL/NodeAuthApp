"use strict";

/*
 * This file is for the passport "strategies" and all their configurations.
 */

// INITIALIZATION

const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const authKeys = require("./authKeys");
const db = require("../db");

passport.serializeUser((user, done) => {
  done(null, user.id);
});
passport.deserializeUser((id, done) => {
  return db.users
    .findByGoogleId(id)
    .then(data => done(null, data))
    .catch(error => done(error));
});

passport.use(
  new GoogleStrategy(
    {
      clientID: authKeys.google.client_id,
      clientSecret: authKeys.google.client_secret,
      callbackURL: "/callback/google",
    },
    (accessToken, refreshToken, profile, done) => {
      // passport callback function
      return db.users
        .findByGoogleId({ google_id: profile.id })
        .then(currentUser => {
          if (currentUser) {
            // already have this user
            console.log("user is: ", currentUser);
            // do something
          } else {
            // if not, create user in our db
            return db.users
              .add({
                username: profile.displayName,
                google_id: profile.id,
                google_access_token: accessToken,
                google_refresh_token: refreshToken,
              })
              .then(newUser => {
                console.log("created new user: ", newUser);
                // do something
              })
              .catch(err => console.log(err));
          }
        })
        .catch(err => console.error(err));
    }
  )
);
