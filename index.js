// Startup
if (process.env.NODE_ENV === 'development') {
  require('dotenv').config()
}
require('./startup/db')()
require('./startup/app')()
