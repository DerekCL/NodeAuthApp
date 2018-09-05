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
const passport = require("passport");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const cors = require("cors");

// module configuration
const app = express();
const port = parseInt(process.env.PORT) || 9000;
const passportConfig = require("./config/passport");

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
      new winston.transports.Http({
        port: 9900,
        path: "/logger/winston/v1",
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
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

var corsOption = {
  origin: true,
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  credentials: true,
  exposedHeaders: ["x-auth-token"],
};
app.use(cors(corsOption));

app.use("/auth/v1", routes);

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
      new winston.transports.Http({
        port: 9900,
        path: "/logger/winston/v1",
      }),
    ],
  })
);

// starting the server
app.listen(port, () => console.log(`started on ${port}`));

module.exports = app;
