const express = require('express')
const helmet = require('helmet')
const cors = require('cors')
const logger = require('./logger')
const morgan = require('morgan')
const weather = require('../routes/weather')
const fs = require('fs')
const path = require('path')

const accessLogStream = fs.createWriteStream(
  path.join(__dirname, '../logs/requests.log'),
  { flags: 'a' }
)
// App
module.exports = () => {
  const app = express()
  app.use(express.json())
  app.use(express.urlencoded({ extended: true }))
  app.use(helmet())
  app.use(cors())
  app.use(morgan('combined', { stream: accessLogStream }))

  // Routes
  app.use('/api/weather', weather)

  // Server
  const port = process.env.PORT || 3000

  app.listen(port, () => {
    logger.info(`Listening on port ${port}`)
  })
}
