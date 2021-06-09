const winston = require('winston')

// Winston Instance
const logger = new winston.createLogger({
  level: 'info',
  format: winston.format.combine(
    winston.format.colorize(),
    winston.format.simple(),
    winston.format.json()
  ),
  transports: [
    new winston.transports.File({
      filename: './logs/errors.log',
      level: 'error',
    }),
    new winston.transports.File({
      filename: './logs/info.log',
    }),
  ],
})

if (process.env.NODE_ENV !== 'production') {
  logger.add(
    new winston.transports.Console({
      format: winston.format.simple(),
    })
  )
}

module.exports = logger
