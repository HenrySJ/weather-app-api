// Startup
require('dotenv').config()
require('./startup/db')()
require('./startup/app')()
