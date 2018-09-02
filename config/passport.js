"use strict";

/*
 * This file is for the passport "strategies" and all their configurations.
 */

// INITIALIZATION

const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const authKeys = require("./authKeys");
const db = require("../db");

passport.use(
  new GoogleStrategy(
    {
      clientID: authKeys.google.client_id,
      clientSecret: authKeys.google.client_secret,
      callbackURL: "/callback/google",
    },
    (accessToken, refreshToken, profile, done) => {
      // passport callback function
      db.users
        .findByToken({ googleId: profile.id })
        .then(currentUser => {
          if (currentUser) {
            // already have this user
            console.log("user is: ", currentUser);
            // do something
          } else {
            // if not, create user in our db
            new User({
              googleId: profile.id,
              username: profile.displayName,
            })
              .save()
              .then(newUser => {
                console.log("created new user: ", newUser);
                // do something
              });
          }
        })
        .catch(err => console.error(err));
    }
  )
);
