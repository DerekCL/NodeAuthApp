"use strict";

/*
 * This file is for the passport "strategies" and all their configurations.
 */

// INITIALIZATION

const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const GoogleTokenStrategy = require("passport-google-token").Strategy;
const authKeys = require("./authKeys");
const db = require("../db");

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  return db.users
    .findBySystemId(id)
    .then(user => done(null, user))
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
            done(null, currentUser);
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
                done(null, newUser);
              })
              .catch(err => console.error(err));
          }
        })
        .catch(err => console.error(err));
    }
  )
);

passport.use(
  new GoogleTokenStrategy(
    {
      clientID: authKeys.google.client_id,
      clientSecret: authKeys.google.client_secret,
    },
    (accessToken, refreshToken, profile, done) => {
      return db.users
        .findByGoogleId({ google_id: profile.id })
        .then(currentUser => {
          // no user was found, lets create a new one
          if (currentUser) {
            // already have this user
            done(null, currentUser);
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
                done(null, newUser);
              })
              .catch(err => console.error(err));
          }
        })
        .catch(err => console.error(err));
    }
  )
);
