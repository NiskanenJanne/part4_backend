const configurations = require('./utilities/configurations')
const express = require('express')
require('express-async-errors')
const app = express()
const cors = require('cors')
const blogsRouter = require('./controllers/blogs')
const userRouter = require('./controllers/users')
const logger = require('./utilities/logger')
const mongoose = require('mongoose')

logger.info('connecting to', configurations.MONGODB_URL)

mongoose.connect(configurations.MONGODB_URL)
  .then(() => {
    logger.info('connected to MongoDB')
  })
  .catch((error) => {
    logger.error('error connection to MongoDB:', error.message)
  })

app.use(cors())
app.use(express.json())

app.use('/api/blogs', blogsRouter)
app.use('/api/users', userRouter)

module.exports = app