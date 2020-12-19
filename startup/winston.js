const { transports } = require("winston");
const winston = require("winston");

// Winston Instance
const logger = new winston.createLogger({
  transports: [
    new winston.transports.File({
      filename: "../logs/error.log",
      level: "error",
    }),
    new transports.Console({
      level: "info",
      format: winston.format.combine(
        winston.format.colorize(),
        winston.format.simple()
      ),
    }),
  ],
  exitOnError: false,
});

module.exports = logger;
