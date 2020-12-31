const winston = require("winston");

// Winston Instance
const logger = new winston.createLogger({
  level: "info",
  format: winston.format.combine(
    winston.format.colorize(),
    winston.format.simple()
  ),
  transports: [
    new winston.transports.File({
      filename: "./logs/errors.log",
    }),
  ],
});

module.exports = logger;
