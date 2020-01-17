const express = require('express')

const projectRouter = require('./routers/projectRouter.js')
const actionRouter = require('./routers/actionRouter.js')

const logger = require('./middleware/logger.js')

const server = express()

server.use(express.json())
server.use(logger)

server.use('/api/projects', projectRouter)
server.use('/api/actions', actionRouter)

server.get('/', (req, res) => {
    res.send(`<h1>Hello World</h1>`)
})

module.exports = server