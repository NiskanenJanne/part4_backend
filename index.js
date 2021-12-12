const app = require('./app')
const configurations = require('./utilities/configurations')
const logger = require('./utilities/logger')
const http = require('http')

const server = http.createServer(app)

server.listen(configurations.PORT, () => {
  logger.info(`Server running on port ${configurations.PORT}`)
});