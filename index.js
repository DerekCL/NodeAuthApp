// Environment Variables
require("dotenv").config();

// module imports
const compression = require("compression");
const express = require("express");
const winston = require("winston");
const expressWinston = require("express-winston");
const helmet = require("helmet");
const routes = require("./routes");
const session = require("express-session");
const pgSession = require("connect-pg-simple")(session);
let passport = require("passport");
let LocalStrategy = require("passport-local").Strategy;

// module configuration
const app = express();
const port = process.env.PORT || 9000;

// Database
const db = require("./db");

// Session Configuration

let sessionMiddleware = session({
  store: new pgSession({
    pgPromise: db,
    tableName: "session",
  }),
  secret: "shhsecret",
  resave: false,
  saveUninitialized: true,
  cookie: {
    maxAge: 100 * 365 * 24 * 60 * 60 * 1000, // In milliseconds
    //  100 years = 100 * 365 days * 24 hours * 60 minutes * 60 seconds * 1000 milliseconds
  },
});
app.use(sessionMiddleware);

// Passport configuration
app.use(passport.initialize());
app.use(passport.session());

// winston request logging
// middleware to log your HTTP requests
app.use(
  expressWinston.logger({
    transports: [
      new winston.transports.Console({
        json: true,
        colorize: true,
      }),
    ],
    meta: true,
    msg: "HTTP {{req.method}} {{req.url}}",
    expressFormat: true,
    colorize: false,
    ignoreRoute: () => {
      return false;
    },
  })
);

// app configuration
app.use(compression());
app.use(helmet());

// routes
app.use("/", routes);

/**
 * winston error logging
 * middleware that log the errors of the pipeline.
 */
app.use(
  expressWinston.errorLogger({
    transports: [
      new winston.transports.Console({
        json: true,
        colorize: true,
      }),
    ],
  })
);

// require("./config/passport")(passport);

// starting the server
app.listen(port, () => console.log(`started on ${port}`));

module.exports = app;
