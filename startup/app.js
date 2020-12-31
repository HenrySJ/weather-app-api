const express = require("express");
const helmet = require("helmet");
const logger = require("./logger");
const morgan = require("morgan");
const weather = require("../routes/weather");
const fs = require("fs");
const path = require("path");

const accessLogStream = fs.createWriteStream(
  path.join(__dirname, "../logs/requests.log"),
  { flags: "a" }
);

// App
module.exports = () => {
  const app = express();
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(helmet());
  app.use(morgan("combined", { stream: accessLogStream }));

  // Routes
  app.use("/api/weather", weather);

  // Error Logging

  app.use(function (err, req, res, next) {
    logger.error(
      `${req.method} - ${err.message} - ${req.originalUrl} - ${req.ip}`
    );
    next(err);
  });

  // Server
  const port = process.env.PORT || 3000;

  app.listen(port, () => {
    console.log(`Listening on port ${port}`);
  });
};
