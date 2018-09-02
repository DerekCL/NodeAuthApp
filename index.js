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
const cors = require("cors");

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
  secret: process.env.SECRET_KEY,
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

if (process.env.NODE_ENV === "production") {
  // Cors configuration
  var whitelist = ["http://localhost:5000"];
  var corsOptions = {
    origin: function(origin, callback) {
      if (whitelist.indexOf(origin) !== -1) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
  };
  // routes
  app.use("/", cors(corsOptions), routes);
} else {
  // routes
  app.use("/", cors(), routes);
}

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
