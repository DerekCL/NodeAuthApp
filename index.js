// Environment Variables
require("dotenv").config();

// module imports
const compression = require("compression");
const express = require("express");
const winston = require("winston");
const expressWinston = require("express-winston");
const helmet = require("helmet");
const routes = require("./routes");

// module configuration
const app = express();
const port = process.env.PORT || 9000;

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

// starting the server
app.listen(port, () => console.log(`started on ${port}`));

module.exports = app;
